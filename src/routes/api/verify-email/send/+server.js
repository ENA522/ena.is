import { json } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';
import { sendVerificationCode } from '$lib/email/verification_service.js';

export async function POST({ request }) {
    try {
        // Get authenticated session
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session?.user) {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { email } = await request.json();

        // Validate email parameter
        if (!email || typeof email !== 'string') {
            return json({ error: 'Email is required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Security: Only allow sending codes for the user's own email
        if (normalizedEmail !== session.user.email.toLowerCase()) {
            return json({ error: 'Can only verify your own email' }, { status: 403 });
        }

        // Send verification code
        const result = await sendVerificationCode({
            userId: session.user.id,
            email: normalizedEmail,
            username: session.user.name
        });

        if (!result.success) {
            return json(
                { error: result.error || 'Failed to send verification code' },
                { status: 500 }
            );
        }

        return json({ success: true, message: 'Verification code sent to your email' });

    } catch (error) {
        console.error('Error in /api/verify-email/send:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
