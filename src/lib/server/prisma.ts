// $lib/server/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
    prisma: InstanceType<typeof PrismaClient> | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
