<script>
    import { page } from '$app/state';
    import { enhance } from '$app/forms';
    import { authClient } from '$lib/auth/auth-client';

    const redirectTarget = $derived.by(() => {
        const raw = page.url.searchParams.get('redirect');
        if (!raw) return null;
        if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
        return null;
    });

    function targetHref(path) {
        return redirectTarget
            ? `${path}?redirect=${encodeURIComponent(redirectTarget)}`
            : path;
    }

    // Client-side OAuth
    function signInWithProvider(provider) {
        authClient.signIn.social({
            provider,
            callback: redirectTarget ?? "/"
        })
    }
</script>

<svelte:head>
    <title>Create your account</title>
</svelte:head>

<section class="mx-auto max-w-sm space-y-4 p-6">
    <h1 class="text-3xl font-bold text-gray-900">Create your account</h1>

    <!-- SOCIAL SIGN UP (client-side) -->
    <div class="space-y-3">

        <!-- GOOGLE -->
        <button
            onclick={() => signInWithProvider('google')}
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700 font-medium"
        >
            <svg class="w-5 h-5" viewBox="0 0 533.5 544" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path fill="#4285F4" d="M533.5 278.4c0-18.6-1.5-37.2-4.6-55.3H272v104.8h147c-6.3 34.3-25 63.5-53.6 83v68h86.5c50.6-46.6 81.6-115.2 81.6-200.5z"/> <path fill="#34A853" d="M272 544c72.6 0 133.5-24 178-65.1l-86.5-68c-24 16-54.7 25.6-91.5 25.6-70 0-129.2-47.2-150.5-110.6H34v69.7C78.5 485.1 167 544 272 544z"/> <path fill="#FBBC05" d="M121.5 325.9c-5.7-16.6-9-34.3-9-52.5s3.3-35.9 9-52.5v-69.7H34C12.3 194.7 0 232.6 0 273.4c0 40.8 12.3 78.7 34 111.7l87.5-69.2z"/> <path fill="#EA4335" d="M272 107.5c39.6 0 75.1 13.6 103.2 40.3l77.5-77.5C405.5 24 344.6 0 272 0 167 0 78.5 58.9 34 161.7l87.5 69.2c21.3-63.4 80.5-110.6 150.5-110.6z"/> </svg>
            Continue with Google
        </button>

        <!-- GITHUB -->
        <button
            onclick={() => signInWithProvider('github')}
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700 font-medium"
        >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.743.082-.729.082-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.464-2.381 1.237-3.221-.124-.303-.532-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.649 1.653.24 2.873.118 3.176.774.84 1.237 1.911 1.237 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.797.576C20.564 22.832 24 18.32 24 12c0-6.627-5.373-12-12-12z"/> </svg>
            Continue with GitHub
        </button>

        <!-- DISCORD -->
        <button
            onclick={() => signInWithProvider('discord')}
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700 font-medium"
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2" fill-rule="nonzero"> </path> </g> </svg>
            Continue with Discord
        </button>

    </div>

    <!-- DIVIDER -->
    <div class="flex items-center gap-3 pt-4">
        <div class="h-px flex-1 bg-gray-200"></div>
        <span class="text-xs uppercase tracking-wide text-gray-500">or continue with email</span>
        <div class="h-px flex-1 bg-gray-200"></div>
    </div>

    <!-- EMAIL SIGNUP (server-side) -->
    <form method="POST" use:enhance class="space-y-6">

        <label class="block">
            <span class="text-sm font-medium text-gray-700">Full name</span>
            <input
                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="name"
                required
                autocomplete="name"
            />
        </label>

        <label class="block">
            <span class="text-sm font-medium text-gray-700">Email address</span>
            <input
                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="email"
                name="email"
                required
                autocomplete="email"
            />
        </label>

        <label class="block">
            <span class="text-sm font-medium text-gray-700">Password</span>
            <input
                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="password"
                name="password"
                required
                autocomplete="new-password"
            />
        </label>

        <button
            class="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
            type="submit"
        >
            Create account
        </button>

        {#if page.form?.error}
            <p class="text-center text-sm text-red-600 p-2 bg-red-50 rounded-lg border border-red-200">
                {page.form.error}
            </p>
        {/if}

    </form>

    <!-- FOOTER -->
    <div class="pt-4 text-center text-sm">
        <p class="text-gray-600">Already have an account?</p>
        <a
            href={targetHref('/login')}
            class="font-medium text-indigo-600 hover:text-indigo-500 transition"
        >
            Sign in
        </a>
    </div>

</section>