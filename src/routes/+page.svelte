<svelte:head>
  <title>ENA - Your Digital Workspace</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative isolate">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div class="text-center max-w-3xl mx-auto space-y-8">
            <div class="space-y-4">
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                    Welcome to
                    <span class="block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">ENA</span>
                </h1>
                <p class="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
                    Your personal digital workspace. Tools, automation, and projects all in one place.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a href="/login" class="inline-flex justify-center items-center rounded-2xl px-6 py-3.5 text-base font-semibold bg-slate-900 text-white hover:bg-slate-800 transition duration-150 shadow-sm">
                    Get Started
                </a>
                <a href="/about" class="inline-flex justify-center items-center rounded-2xl px-6 py-3.5 text-base font-semibold border border-slate-300 hover:bg-slate-50 transition duration-150">
                    Learn More
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Quick Links Grid -->
<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Portfolio Card -->
        <a href="/settings/profile" class="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <div class="space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Portfolio</h3>
                <p class="text-slate-600 text-sm">Manage your profile and showcase your work</p>
            </div>
        </a>

        <!-- Tools Card -->
        <a href="/minesweeper" class="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <div class="space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Tools</h3>
                <p class="text-slate-600 text-sm">Utilities and experiments</p>
            </div>
        </a>

        <!-- Bot Dashboard Card -->
        <a href="/bot/dashboard" class="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <div class="space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Bots</h3>
                <p class="text-slate-600 text-sm">Manage Discord bots and automation</p>
            </div>
        </a>
    </div>
</section>

<!-- CTA Section -->
<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <div class="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        <div class="max-w-2xl mx-auto text-center space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Ready to get started?</h2>
            <p class="text-lg text-slate-300">
                Sign in to access all your tools and configurations.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <a href="/login" class="inline-flex justify-center items-center rounded-2xl bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-slate-100 transition duration-150">
                    Sign In
                </a>
                <a href="/register" class="inline-flex justify-center items-center rounded-2xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition duration-150">
                    Create Account
                </a>
            </div>
        </div>
    </div>
</section>