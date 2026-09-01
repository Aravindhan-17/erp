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
  Param,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomerUsersService } from '../users/customer-users.service';
import { CustomerJwtAuthGuard } from '../auth/guards/customer-jwt-auth.guard';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';

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
    const customerId = req.user.id as string;
    const customer = await this.customerUsersService.findById(customerId);
    if (!customer) {
      throw new UnauthorizedException('Customer not found');
    }

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
    const customerId = req.user.id as string;
    const customer = await this.customerUsersService.updateProfile(
      customerId,
      body,
    );

    const { passwordHash: _, ...result } = customer;
    return {
      message: 'Profile updated successfully',
      customer: result,
    };
  }

  @ApiOperation({ summary: 'Upload customer profile image' })
  @ApiResponse({
    status: 201,
    description: 'Profile image uploaded successfully.',
  })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  )
  async uploadProfileImage(
    @Request() req: { user: Record<string, any> },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const customerId = req.user.id as string;
    const profileImageUrl = `/uploads/profiles/${file.filename}`;

    const customer = await this.customerUsersService.updateProfile(customerId, {
      profileImage: profileImageUrl,
    });

    const { passwordHash: _, ...result } = customer;

    return {
      message: 'Profile image uploaded successfully',
      customer: result,
      profileImage: profileImageUrl,
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
    const customerId = req.user.id as string;
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
      message: 'Password updated successfully',
    };
  }

  @ApiOperation({ summary: 'Get all customer addresses' })
  @ApiResponse({ status: 200, description: 'Returns all customer addresses.' })
  @Get('addresses')
  async getAddresses(@Request() req: { user: Record<string, any> }) {
    const customerId = req.user.id as string;
    return this.customerUsersService.getAddresses(customerId);
  }

  @ApiOperation({ summary: 'Add a new address' })
  @ApiResponse({ status: 201, description: 'Address added successfully.' })
  @Post('addresses')
  async addAddress(
    @Request() req: { user: Record<string, any> },
    @Body() body: CreateCustomerAddressDto,
  ) {
    const customerId = req.user.id as string;
    const address = await this.customerUsersService.createAddress(
      customerId,
      body,
    );
    return {
      message: 'Address added successfully',
      address,
    };
  }

  @ApiOperation({ summary: 'Update an address' })
  @ApiResponse({ status: 200, description: 'Address updated successfully.' })
  @Put('addresses/:id')
  async updateAddress(
    @Request() req: { user: Record<string, any> },
    @Param('id') addressId: string,
    @Body() body: UpdateCustomerAddressDto,
  ) {
    const customerId = req.user.id as string;
    const address = await this.customerUsersService.updateAddress(
      customerId,
      addressId,
      body,
    );
    return {
      message: 'Address updated successfully',
      address,
    };
  }

  @ApiOperation({ summary: 'Delete an address' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully.' })
  @Delete('addresses/:id')
  async deleteAddress(
    @Request() req: { user: Record<string, any> },
    @Param('id') addressId: string,
  ) {
    const customerId = req.user.id as string;
    await this.customerUsersService.deleteAddress(customerId, addressId);
    return {
      message: 'Address deleted successfully',
    };
  }
}
