import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';

function sanitizeRedirect(url) {
    if (!url) return null;
    if (url.startsWith('/') && !url.startsWith('//')) return url;
    return null;
}

export const actions = {
    default: async ({ request, cookies, url }) => {
        const form = await request.formData();

        const name = form.get('name')?.toString();
        const email = form.get('email')?.toString();
        const password = form.get('password')?.toString();

        const redirectTarget = sanitizeRedirect(url.searchParams.get('redirect'));

        if (!name || !email || !password) {
            return fail(400, { error: 'All fields are required' });
        }

        const result = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                image: "https://avatars.githubusercontent.com/u/248114833?v=4&size=64"
            },
            cookies
        });

        // ✅ Correct validation
        if (!result || result.error) {
            return fail(400, {
                error: result?.error?.message || 'Signup failed'
            });
        }

        throw redirect(303, redirectTarget ?? '/');
    }
};
