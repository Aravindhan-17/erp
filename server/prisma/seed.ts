import { PrismaClient, AdminRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || 'postgresql://flasherp_user:flasherp_password@localhost:5433/flasherp_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@flashstore.com';
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });
    console.log(`Created admin user: ${admin.email} (pass: admin123)`);
  } else {
    console.log(`Admin user already exists: ${existingAdmin.email}`);
  }
  const archerEmail = 'archer@yopmail.com';
  const existingArcher = await prisma.adminUser.findUnique({
    where: { email: archerEmail },
  });

  if (!existingArcher) {
    const passwordHash = await bcrypt.hash('archer123', 10);
    const admin = await prisma.adminUser.create({
      data: {
        email: archerEmail,
        passwordHash,
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });
    console.log(`Created admin user: ${admin.email} (pass: archer123)`);
  } else {
    console.log(`Admin user already exists: ${existingArcher.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });