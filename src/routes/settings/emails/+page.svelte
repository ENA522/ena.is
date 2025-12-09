<script>
    let { data } = $props();

    import { enhance } from '$app/forms';

    // ---------- DERIVED STATE (Reactive to data prop) ----------
    // Use $derived instead of $state for values that come from data
    let emails = $derived(data.emails ?? []);
    let primaryEmailId = $derived(
        emails.find(e => e.email === data.user.email)?.id ?? null
    );

    // ---------- LOCAL UI STATE ----------
    let newEmail = $state('');
    let backupEmail = $state('all');
    let openMenuId = $state(null);

    // ---------- UI HELPERS ----------
    const toggleMenu = (emailId) => {
        openMenuId = openMenuId === emailId ? null : emailId;
    };

    const handleManagePreferences = (emailId) => {
        console.log("Manage:", emailId);
        openMenuId = null;
    };

    const handleDeleteEmail = (emailId) => {
        console.log("Delete:", emailId);
        openMenuId = null;
    };

    const handleAddEmail = (event) => {
        event.preventDefault();
        console.log("Add:", newEmail);
    };

    const handleSetBackup = (event) => {
        event.preventDefault();
        console.log("Backup set:", backupEmail);
    };
</script>


<svelte:head>
	<title>Email Settings - ENA</title>
</svelte:head>

<section class="relative isolate">
	<div class="space-y-8">
		<!-- Header -->
		<div>
			<p class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-600">Access</p>
			<h1 class="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
				Emails
			</h1>
			<p class="mt-3 text-base text-slate-600 max-w-prose">
				You can add multiple email addresses and set one as your primary contact. Your primary email is used for sign-in and account-related notifications.
			</p>
		</div>

		<!-- Email List -->
		<div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div class="divide-y divide-slate-200">
				{#each emails as email}
					<div class="p-4 sm:p-6">
						<div class="flex items-start justify-between gap-4">
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 flex-wrap">
									<span class="text-base font-medium text-slate-900 break-all">{email.email}</span>
									{#if email.isPrimary}
										<span class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-300 bg-white">
											Primary
										</span>
									{/if}
									{#if email.verified}
										<span class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-green-700 border border-green-300 bg-white">
											Verified
										</span>
									{/if}
								</div>
								{#if email.isDefault}
									<p class="mt-1 text-sm text-slate-600">
										This is your primary email address used for sign-in and account notifications.
									</p>
								{/if}
							</div>

							<!-- Three Dot Menu -->
							<div class="relative flex-shrink-0">
								<button
									onclick={() => toggleMenu(email.id)}
									class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition duration-150"
									aria-label="Email options"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
										<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
									</svg>
								</button>

								{#if openMenuId === email.id}
									<div class="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
										<div class="py-1">
											<button
												onclick={() => handleManagePreferences(email.id)}
												class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition duration-150"
											>
												Manage email preferences
											</button>
											<button
												onclick={() => handleDeleteEmail(email.id)}
												class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
											>
												Delete
											</button>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Add Email Form -->
		<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
			<form onsubmit={handleAddEmail} class="space-y-4">
				<div>
					<label for="add-email" class="block text-sm font-semibold text-slate-900 mb-2">
						Add email address <span class="text-red-500">*</span>
					</label>
					<div class="flex flex-col sm:flex-row gap-3">
						<input
							id="add-email"
							type="email"
							bind:value={newEmail}
							required
							placeholder="Email address"
							class="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
						/>
						<button
							type="submit"
							class="rounded-lg bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-800 transition duration-150 whitespace-nowrap sm:w-auto w-full"
						>
							Add
						</button>
					</div>
				</div>
			</form>
		</div>

		<!-- Primary Email Form -->
		<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
			<form method="POST" action="?/setPrimary"
    use:enhance>
				<div>
					<label for="primary-email" class="block text-sm font-semibold text-slate-900 mb-2">
						Primary email address
					</label>
					<p class="text-sm text-slate-600 mb-3">
						Select an email to be used for sign-in and account-related notifications. This will become your login email address.
					</p>
					<select
						id="primary-email"
						name="emailId"
						bind:value={primaryEmailId}
						onchange={(e) => {
							e.target.form.requestSubmit();
						}}
						class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
					>
						{#each emails.filter(e => e.verified) as email}
							<option value={email.id}>{email.email}</option>
						{/each}
					</select>
				</div>
			</form>
		</div>

		<!-- Backup Email Form -->
		<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
			<form onsubmit={handleSetBackup}>
				<div>
					<label for="backup-email" class="block text-sm font-semibold text-slate-900 mb-2">
						Backup email address
					</label>
					<p class="text-sm text-slate-600 mb-3">
						Your backup email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.
					</p>
					<select
						id="backup-email"
						bind:value={backupEmail}
						onchange={(e) => {
							e.target.form.requestSubmit();
						}}
						class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
					>
						<option value="all">Allow all verified emails</option>
						{#each emails.filter(e => e.verified && !e.isPrimary) as email}
							<option value={email.id}>{email.email}</option>
						{/each}
					</select>
				</div>
			</form>
		</div>
	</div>
</section>

<svelte:window onclick={(e) => {
	if (!e.target.closest('button[aria-label="Email options"]') && !e.target.closest('.absolute.right-0')) {
		openMenuId = null;
	}
}} />