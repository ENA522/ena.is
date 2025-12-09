// src/routes/settings/emails/+page.server.ts
import { invalidate } from '$app/navigation';
import { auth } from '$lib/auth/auth';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const user = locals.user;
    if (!user) throw redirect(302, '/login');

    const aliases = await prisma.userEmail.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'asc' }
    });

    const emails = [
        {
            id: 'primary',
            email: user.email,
            isPrimary: true,
            isDefault: true,
            verified: true
        },
        ...aliases.map(e => ({
            id: e.id,
            email: e.email,
            isPrimary: false,
            isDefault: false,
            verified: e.verified
        }))
    ];

    return { user, emails };
}


/* ---------------------------------------------------- */
/* Actions */
/* ---------------------------------------------------- */

export const actions = {

    addEmail: async ({ request, cookies }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401);

        const form = await request.formData();
        const email = String(form.get('email')).toLowerCase().trim();

        if (!email.includes('@')) {
            return fail(400, { error: 'Invalid email address' });
        }

        await prisma.userEmail.create({
            data: {
                userId: session.user.id,
                email,
                verified: false
            }
        });

        return { success: true };
    },


    setPrimary: async ({ request, locals }) => {
        let session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401);

        const form = await request.formData();
        const emailId = String(form.get('emailId'));
        const userId = session.user.id;

        const newPrimaryAlias = await prisma.userEmail.findFirst({
            where: { id: emailId, userId }
        });

        if (!newPrimaryAlias)
            return fail(400, { error: 'Email not found' });

        if (!newPrimaryAlias.verified)
            return fail(400, { error: 'Email must be verified' });

        await prisma.$transaction(async (tx) => {

            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { email: true }
            });

            if (!user) throw new Error("User not found");

            const oldPrimaryEmail = user.email;
            const newPrimaryEmail = newPrimaryAlias.email;

            if (oldPrimaryEmail === newPrimaryEmail) return;

            // move old primary into alias table
            await tx.userEmail.upsert({
                where: { email: oldPrimaryEmail },
                update: {},
                create: {
                    userId,
                    email: oldPrimaryEmail,
                    verified: true
                }
            });

            // remove selected alias
            await tx.userEmail.delete({
                where: { id: newPrimaryAlias.id }
            });

            // update primary field
            await tx.user.update({
                where: { id: userId },
                data: { email: newPrimaryEmail }
            });
        });

        session = await auth.api.getSession({
            headers: request.headers,
            query: {
                disableCookieCache: true
            }
        });

        return { success: true };
    },


    deleteEmail: async ({ request, cookies }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return fail(401);

        const form = await request.formData();
        const id = String(form.get('emailId'));

        const record = await prisma.userEmail.findFirst({
            where: { id, userId: session.user.id }
        });

        if (!record) return fail(404);

        if (record.email === session.user.email)
            return fail(400, { error: 'Cannot delete primary email' });

        await prisma.userEmail.delete({ where: { id } });

        return { success: true };
    }
};
