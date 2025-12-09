// $lib/server/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = await import('@prisma/client');

const globalForPrisma = globalThis as unknown as {
    prisma?: InstanceType<typeof PrismaClient>;
};

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
        console.warn('DATABASE_URL not set, using default Prisma client');
        return new PrismaClient();
    }
    
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}