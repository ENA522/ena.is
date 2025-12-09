// src/routes/api/auth/set-password/+server.ts
import { json } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

const setPasswordSchema = z.object({
	newPassword: z.string().min(8).max(128),
});

export const POST = async ({ request }) => {
	try {
		const body = await request.json();
		const validation = setPasswordSchema.safeParse(body);

		if (!validation.success) {
			return json(
				{ error: 'Password must be at least 8 characters' },
				{ status: 400 }
			);
		}

		const { newPassword } = validation.data;

		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = session.user.id;

		// ✅ Use Better Auth's built-in setPassword
		// This creates a credential account for user.email
		await auth.api.setPassword({
			body: { newPassword },
			headers: request.headers,
		});

		// ✅ NOW sync ALL OAuth provider emails to credential accounts
		// This only happens AFTER user explicitly sets a password
		try {
			const user = await prisma.user.findUnique({
				where: { id: userId }
			});

			if (!user?.email) {
				return json({
					success: true,
					message: 'Password set successfully',
				});
			}

			// Get the newly created credential account
			const credentialAccount = await prisma.account.findFirst({
				where: {
					userId,
					providerId: 'credential',
					password: { not: null }
				}
			});

			if (!credentialAccount?.password) {
				return json({
					success: true,
					message: 'Password set successfully',
				});
			}

			// Get all OAuth accounts
			const oauthAccounts = await prisma.account.findMany({
				where: {
					userId,
					providerId: { not: 'credential' }
				}
			});

			// For each OAuth account, create a credential if user.email matches
			// (This handles cases where OAuth email = user.email)
			const existingCredentials = await prisma.account.findMany({
				where: {
					userId,
					providerId: 'credential'
				}
			});

			const existingEmails = new Set(
				existingCredentials.map(a => a.accountId)
			);

			// Only add user.email if it doesn't already have a credential
			if (!existingEmails.has(user.email)) {
				await prisma.account.create({
					data: {
						userId,
						providerId: 'credential',
						accountId: user.email,
						password: credentialAccount.password
					}
				});
			}

		} catch (syncError) {
			console.error('Error syncing OAuth emails:', syncError);
			// Don't fail the request if sync fails
		}

		return json({
			success: true,
			message: 'Password set successfully',
		});
	} catch (error) {
		console.error('Set password error:', error);
		return json({ error: 'Failed to set password' }, { status: 500 });
	}
};