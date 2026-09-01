import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { WalletTransactionDto } from './dto/wallet-transaction.dto';

@Injectable()
export class AdminCustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: CustomerQueryDto) {
    const {
      search,
      segment,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (segment) {
      if (segment.toLowerCase() === 'active') {
        where.isActive = true;
      } else if (segment.toLowerCase() === 'suspended') {
        where.isActive = false;
      }
      // Note: 'new' and 'vip' segments will require order/spend tracking data in the future
    }

    // Default to createdAt if an invalid sortBy field is provided
    const validSortFields = [
      'createdAt',
      'firstName',
      'lastName',
      'email',
      'isActive',
    ];
    const actualSortBy = validSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [actualSortBy]: sortOrder },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          lastLogin: true,
          lifetimeSpend: true,
          ordersCount: true,
          wallet: { select: { balance: true, currency: true } },
          // Omitting passwordHash for security
        },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        wallet: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async toggleSuspend(id: string, isActive: boolean) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prisma.customer.update({
      where: { id },
      data: { isActive },
      select: { id: true, isActive: true },
    });
  }

  async createWalletTransaction(customerId: string, dto: WalletTransactionDto) {
    // 1. Ensure the customer exists and get/create their wallet
    let wallet = await this.prisma.customerWallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await this.prisma.customerWallet.create({
        data: { customerId },
      });
    }

    // 2. Perform the transaction inside a Prisma transaction
    return this.prisma.$transaction(async (tx) => {
      // Calculate new balance
      const changeAmount = dto.type === 'CREDIT' ? dto.amount : -dto.amount;

      // Prevent negative balance for debits (if that's a business rule)
      if (dto.type === 'DEBIT' && Number(wallet.balance) < dto.amount) {
        throw new Error('Insufficient wallet balance');
      }

      // Update wallet balance
      const updatedWallet = await tx.customerWallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: changeAmount },
        },
      });

      // Record transaction
      const transaction = await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount: dto.amount,
          type: dto.type,
          description: dto.description,
        },
      });

      return { wallet: updatedWallet, transaction };
    });
  }

  async getCustomerOrders(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    return this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCustomerTickets(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    return this.prisma.ticket.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
