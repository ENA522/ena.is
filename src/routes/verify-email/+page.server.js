import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';
import { sendVerificationCode } from '$lib/email/verification_service.js';

export async function load({ locals }) {
    const user = locals.user;

    // Redirect if not logged in
    if (!user) {
        throw redirect(302, '/login');
    }

    // Redirect if already verified
    if (user.emailVerified) {
        throw redirect(302, '/');
    }

    // Send initial verification code
    try {
        await sendVerificationCode({
            userId: user.id,
            email: user.email,
            username: user.name
        });
    } catch (error) {
        console.error('Error sending initial verification code:', error);
    }

    return {
        user
    };
}
