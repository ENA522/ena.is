import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';

function sanitizeRedirect(url) {
    if (!url) return null;
    if (url.startsWith('/') && !url.startsWith('//')) return url;
    return null;
}

export const actions = {
    login: async ({ request, cookies, url }) => {
        const data = await request.formData();

        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const rememberMe = data.get('rememberMe') === 'on';

        const redirectParam = sanitizeRedirect(url.searchParams.get('redirect'));

        if (!email || !password) {
            return fail(400, {
                error: 'Email and password are required',
                values: { email }
            });
        }

        try {
            await auth.api.signInEmail({
                body: { email, password, rememberMe },
                cookies
            });
        } catch (err) {
            return fail(401, {
                error: err?.message ?? 'Invalid email or password',
                values: { email }
            });
        }

        throw redirect(303, redirectParam ?? '/');
    }
};
