import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AdminCustomersService } from './admin-customers.service';
import { AdminJwtAuthGuard } from '../auth/guards/admin-jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRole } from '@prisma/client';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { WalletTransactionDto } from './dto/wallet-transaction.dto';

@ApiTags('AdminCustomers')
@ApiBearerAuth()
@Controller('admin/customers')
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Roles(AdminRole.SUPER_ADMIN, AdminRole.MANAGER)
export class AdminCustomersController {
  constructor(private readonly adminCustomersService: AdminCustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated list of customers' })
  @ApiOkResponse({
    description: 'Paginated list of customers returned successfully.',
  })
  async findAll(@Query() query: CustomerQueryDto) {
    return this.adminCustomersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminCustomersService.findOne(id);
  }

  @Patch(':id/suspend')
  async toggleSuspend(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.adminCustomersService.toggleSuspend(id, isActive);
  }

  @Post(':id/wallet/transaction')
  @ApiOperation({ summary: 'Add or remove funds from a customer wallet' })
  @ApiCreatedResponse({
    description: 'Wallet transaction created successfully',
  })
  async createWalletTransaction(
    @Param('id') id: string,
    @Body() dto: WalletTransactionDto,
  ) {
    return this.adminCustomersService.createWalletTransaction(id, dto);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get order history for a customer' })
  async getCustomerOrders(@Param('id') id: string) {
    return this.adminCustomersService.getCustomerOrders(id);
  }

  @Get(':id/tickets')
  @ApiOperation({ summary: 'Get support tickets for a customer' })
  async getCustomerTickets(@Param('id') id: string) {
    return this.adminCustomersService.getCustomerTickets(id);
  }
}
