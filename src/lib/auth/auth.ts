import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "$lib/server/prisma";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

const ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://ena.is",
    "https://www.ena.is",
];

// Lazy initialization
let _auth: ReturnType<typeof betterAuth> | null = null;

function createAuth() {
    if (_auth) return _auth;
    
    _auth = betterAuth({
        trustedOrigins: ORIGINS,
        
        database: prismaAdapter(prisma, {
            provider: 'postgresql'
        }),
        
        user: {
            additionalFields: {
                display_name: { type: "string", required: false },
                full_name:    { type: "string", required: false },
                bio:          { type: "string", required: false },
                role:         { type: "string", required: true, defaultValue: "user" },
                timezone:     { type: "string", required: false },
                theme:        { type: "string", required: false, defaultValue: "light" },
                language:     { type: "string", required: false, defaultValue: "en" }
            }
        },
        
        account: {
            accountLinking: {
                enabled: true,
                allowDifferentEmails: true,
                trustedProviders: ["github", "google", "discord"]
            }
        },
        
        socialProviders: {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                redirectURI: "https://ena.is/api/auth/callback/github",
            },
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                redirectURI: "https://ena.is/api/auth/callback/google",
            },
            discord: {
                clientId: process.env.DISCORD_CLIENT_ID!,
                clientSecret: process.env.DISCORD_CLIENT_SECRET!,
                redirectURI: "https://ena.is/api/auth/callback/discord",
                scopes: ["identify", "guilds"],
            },
        },
        
        emailAndPassword: {
            enabled: true,
        },
        
        plugins: [
            sveltekitCookies(getRequestEvent),
        ],
    });
    
    return _auth;
}

// Export a proxy that delays initialization
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
    get(target, prop) {
        const instance = createAuth();
        return instance[prop as keyof typeof instance];
    }
});