import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Customer, Prisma, Gender } from '@prisma/client';

@Injectable()
export class CustomerUsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data: { passwordHash },
    });
  }

  async updateProfile(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      dob?: Date;
      gender?: Gender;
      profileImage?: string;
    },
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }
}
