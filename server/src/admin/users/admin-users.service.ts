import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Prisma, AdminUser } from '@prisma/client';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AdminUser | null> {
    return this.prisma.adminUser.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<AdminUser | null> {
    return this.prisma.adminUser.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.AdminUserCreateInput): Promise<AdminUser> {
    return this.prisma.adminUser.create({
      data,
    });
  }
}
