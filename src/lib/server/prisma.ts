// $lib/server/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = await import('@prisma/client');

const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db';

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
    prisma?: InstanceType<typeof PrismaClient>;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}