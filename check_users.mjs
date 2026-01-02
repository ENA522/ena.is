import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            accounts: {
                select: {
                    providerId: true
                }
            }
        },
        take: 10,
        orderBy: { createdAt: 'desc' }
    });

    console.log('\n📊 Recent Users:');
    if (users.length === 0) {
        console.log('No users found in database');
    } else {
        console.table(users.map(u => ({
            name: u.name?.substring(0, 15),
            email: u.email?.substring(0, 25),
            verified: u.emailVerified,
            provider: u.accounts.map(a => a.providerId).join(',') || 'credentials'
        })));
    }
} catch (error) {
    console.error('Error:', error.message);
} finally {
    await prisma.$disconnect();
}
