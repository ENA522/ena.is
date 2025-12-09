// $lib/server/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '$lib/server/prisma';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { createAuthMiddleware } from 'better-auth/api';

const ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://ena.is',
    'https://www.ena.is'
];

const DEV = process.env.NODE_ENV !== 'production';

function getRedirect(base: string) {
    return DEV
        ? `http://localhost:3000/api/auth/callback/${base}`
        : `https://ena.is/api/auth/callback/${base}`;
}

export const auth = betterAuth({
    trustedOrigins: ORIGINS,

    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),

    experimental: {
        joins: true
    },

    user: {
        additionalFields: {
            display_name: { type: 'string', required: false },
            full_name: { type: 'string', required: false },
            bio: { type: 'string', required: false },
            role: { type: 'string', required: true, defaultValue: 'user' },
            timezone: { type: 'string', required: false },
            theme: { type: 'string', required: false, defaultValue: 'light' },
            language: { type: 'string', required: false, defaultValue: 'en' }
        }
    },

    account: {
        accountLinking: {
            enabled: true,
            allowDifferentEmails: true,
            trustedProviders: ['github', 'google', 'discord']
        }
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || 'build-time-placeholder',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || 'build-time-placeholder',
            redirectURI: getRedirect('github')
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || 'build-time-placeholder',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'build-time-placeholder',
            redirectURI: getRedirect('google')
        },
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID || 'build-time-placeholder',
            clientSecret: process.env.DISCORD_CLIENT_SECRET || 'build-time-placeholder',
            redirectURI: getRedirect('discord'),
            scope: ['identify', 'guilds']
        }
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },

    hooks: {
        // ------------------------------------------------
        // BEFORE: resolve login email → primary account
        // ------------------------------------------------
        before: createAuthMiddleware(async (ctx) => {
            // Only care about email/password sign-in
            if (ctx.path !== '/sign-in/email') {
                return;
            }
            console.log('Before hook triggered for /sign-in/email');

            const rawEmail = ctx.body?.email;
            if (!rawEmail) {
                return;
            }

            const email = String(rawEmail).trim().toLowerCase();

            console.log(`Looking up alias for email: ${email}`);

            // Look up in user_emails (alias table)
            const alias = await prisma.userEmail.findUnique({
                where: { email },
                include: { user: true }
            });

            console.log(`Alias lookup result: ${alias ? 'found' : 'not found'}`);

            // If no alias, just normalize casing and continue
            if (!alias) {
                return;
            }

            // We found a primary account behind this email alias
            const primaryEmail = alias.user.email.trim().toLowerCase();

            console.log(`Resolved primary email: ${primaryEmail}`);

            ctx.body.email = primaryEmail;
            
        }),

        // ------------------------------------------------
        // AFTER: keep user_emails in sync for sign-up + OAuth
        // ------------------------------------------------
        after: createAuthMiddleware(async (ctx) => {
            const path = ctx.path;

            // ========== ACCOUNT LINK / UNLINK DETECTION ===========
            const isLinkFlow = path === '/link-social';
            const isUnlinkFlow = path === '/unlink-account';

            // Fetch user if session exists
            const session = ctx.context.session;
            const user = ctx.context.newSession?.user || session?.user;
            if (!user) return;

            const userId = user.id;
            const inputEmail = ctx.context._inputEmail?.toLowerCase();
            const primaryEmail = user.email?.toLowerCase();

            let event = 'unknown';

            // ------------------------------------------------------
            // EMAIL FLOWS
            // ------------------------------------------------------
            if (path === '/sign-up/email') event = 'email-signup';
            else if (path === '/sign-in/email') event = 'email-login';

            // ------------------------------------------------------
            // OAUTH FLOWS
            // ------------------------------------------------------
            else if (path.startsWith('/callback/')) {

                const provider = ctx.params?.id;

                const account = await prisma.account.findFirst({
                    where: { providerId: provider, userId }
                });

                if (!account) {
                    console.warn("OAuth completed but ACCOUNT NOT FOUND");
                    return;
                }

                // If account was created within last 3 seconds → signup
                const age = Date.now() - new Date(account.createdAt).getTime();
                const isSignup = age < 3000;

                event = isSignup ? 'oauth-signup' : 'oauth-login';
            }

            // ------------------------------------------------------
            // ACCOUNT LINK / UNLINK (NO SESSION RECREATED)
            // ------------------------------------------------------
            else if (isLinkFlow) event = 'account-link';
            else if (isUnlinkFlow) event = 'account-unlink';


            // Store alias email only if different
            if (inputEmail && inputEmail !== primaryEmail) {
                await prisma.userEmail.upsert({
                    where: { email: inputEmail },
                    update: { userId },
                    create: {
                        userId,
                        email: inputEmail,
                        verified: false
                    }
                });
            }

        })
    },

    plugins: [sveltekitCookies(getRequestEvent)]
});
