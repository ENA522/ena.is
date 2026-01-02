import { json } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';
import { verifyCode } from '$lib/email/verification_service.js';

export async function POST({ request }) {
    try {
        // Get authenticated session
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session?.user) {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { email, code } = await request.json();

        // Validate parameters
        if (!email || !code) {
            return json({ error: 'Email and code are required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Security: Only allow verifying the user's own email
        if (normalizedEmail !== session.user.email.toLowerCase()) {
            return json({ error: 'Can only verify your own email' }, { status: 403 });
        }

        // Verify the code
        const result = await verifyCode({
            userId: session.user.id,
            email: normalizedEmail,
            code: code.trim()
        });

        if (!result.success) {
            return json(
                { error: result.error || 'Invalid verification code' },
                { status: 400 }
            );
        }

        return json({
            success: true,
            message: 'Email verified successfully!'
        });

    } catch (error) {
        console.error('Error in /api/verify-email/verify:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
