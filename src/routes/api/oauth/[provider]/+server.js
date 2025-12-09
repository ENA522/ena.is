import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';

const ALLOWED = ['google', 'github', 'discord'];

function sanitizeRedirect(url) {
    if (!url) return null;
    if (url.startsWith('/') && !url.startsWith('//')) return url;
    return null;
}

export async function GET({ params, url, cookies }) {
    const provider = params.provider;

    if (!ALLOWED.includes(provider)) {
        throw redirect(302, '/login');
    }

    const redirectTarget = sanitizeRedirect(url.searchParams.get('redirect'));

    const result = await auth.api.signInSocial({
        body: {
            provider,
            redirectTo: redirectTarget ?? '/'
        },
        cookies
    });

    throw redirect(302, result.url);
}
