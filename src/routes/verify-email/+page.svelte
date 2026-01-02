<script>
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    let { data } = $props();
    let code = $state('');
    let error = $state('');
    let success = $state('');
    let loading = $state(false);
    let resending = $state(false);

    async function handleVerify(e) {
        e.preventDefault();
        error = '';
        success = '';
        loading = true;

        try {
            const response = await fetch('/api/verify-email/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.user.email,
                    code: code.toUpperCase().trim()
                })
            });

            const result = await response.json();

            if (!response.ok) {
                error = result.error || 'Verification failed';
                loading = false;
                return;
            }

            success = 'Email verified successfully! Redirecting...';
            setTimeout(() => {
                goto('/');
            }, 1500);

        } catch (err) {
            error = 'Network error. Please try again.';
            loading = false;
        }
    }

    async function handleResend() {
        error = '';
        success = '';
        resending = true;

        try {
            const response = await fetch('/api/verify-email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.user.email })
            });

            const result = await response.json();

            if (!response.ok) {
                error = result.error || 'Failed to resend code';
                resending = false;
                return;
            }

            success = 'New verification code sent to your email!';
            code = '';
            resending = false;

        } catch (err) {
            error = 'Network error. Please try again.';
            resending = false;
        }
    }
</script>

<svelte:head>
    <title>Verify Your Email</title>
</svelte:head>

<section class="mx-auto max-w-md space-y-6 p-6">

    <!-- Header -->
    <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold text-gray-900">Verify your email</h1>
        <p class="text-gray-600">
            We've sent a verification code to<br>
            <strong class="text-gray-900">{data.user.email}</strong>
        </p>
    </div>

    <!-- Verification Form -->
    <form onsubmit={handleVerify} class="space-y-6">

        <label class="block">
            <span class="text-sm font-medium text-gray-700">Enter verification code</span>
            <input
                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl font-mono tracking-widest uppercase shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                bind:value={code}
                placeholder="ABC123"
                maxlength="6"
                required
                autocomplete="off"
                disabled={loading || !!success}
            />
        </label>

        <button
            class="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading || code.length !== 6 || !!success}
        >
            {loading ? 'Verifying...' : 'Verify Email'}
        </button>

        {#if error}
            <div class="text-center text-sm text-red-600 p-3 bg-red-50 rounded-lg border border-red-200">
                {error}
            </div>
        {/if}

        {#if success}
            <div class="text-center text-sm text-green-600 p-3 bg-green-50 rounded-lg border border-green-200">
                {success}
            </div>
        {/if}

    </form>

    <!-- Resend Code -->
    <div class="text-center space-y-3 pt-4">
        <p class="text-sm text-gray-600">
            Didn't receive the code?
        </p>
        <button
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition disabled:text-gray-400 disabled:cursor-not-allowed"
            type="button"
            onclick={handleResend}
            disabled={resending || !!success}
        >
            {resending ? 'Sending...' : 'Resend code'}
        </button>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
        <p>The code expires in 5 minutes.</p>
        <p class="mt-2">Don't share this code with anyone.</p>
    </div>

</section>
