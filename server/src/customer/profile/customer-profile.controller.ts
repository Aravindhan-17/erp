import {
  Controller,
  Get,
  Patch,
  Put,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomerUsersService } from '../users/customer-users.service';
import { CustomerJwtAuthGuard } from '../auth/guards/customer-jwt-auth.guard';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('Customer Profile')
@ApiBearerAuth()
@UseGuards(CustomerJwtAuthGuard)
@Controller('customer/profile')
export class CustomerProfileController {
  constructor(private readonly customerUsersService: CustomerUsersService) {}

  @ApiOperation({ summary: 'Get current customer profile' })
  @ApiResponse({ status: 200, description: 'Returns the customer profile.' })
  @Get()
  async getProfile(@Request() req: { user: Record<string, any> }) {
    const customerId = req.user.sub as string;
    const customer = await this.customerUsersService.findById(customerId);
    if (!customer) {
      throw new UnauthorizedException('Customer not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = customer;
    return result;
  }

  @ApiOperation({ summary: 'Update current customer profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.' })
  @Patch()
  async updateProfile(
    @Request() req: { user: Record<string, any> },
    @Body() body: UpdateCustomerProfileDto,
  ) {
    const customerId = req.user.sub as string;
    const customer = await this.customerUsersService.updateProfile(
      customerId,
      body,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = customer;
    return {
      message: 'Profile updated successfully',
      customer: result,
    };
  }

  @ApiOperation({ summary: 'Change customer password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully.' })
  @ApiResponse({ status: 401, description: 'Incorrect current password.' })
  @Put('password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Request() req: { user: Record<string, any> },
    @Body() body: UpdateCustomerPasswordDto,
  ) {
    const customerId = req.user.sub as string;
    const customer = await this.customerUsersService.findById(customerId);

    if (!customer) {
      throw new UnauthorizedException('Customer not found');
    }

    const isMatch = await bcrypt.compare(
      body.currentPassword,
      customer.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect current password');
    }

    const newPasswordHash = await bcrypt.hash(body.newPassword, 10);
    await this.customerUsersService.updatePassword(customerId, newPasswordHash);

    return {
      message: 'Password changed successfully',
    };
  }
}
