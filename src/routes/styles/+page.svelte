<svelte:head>
	<title>Style Reference - ENA</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
	<div class="space-y-12">
		<!-- Header -->
		<div class="space-y-4">
			<p class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-600">
				Design System
			</p>
			<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
				Style Reference
			</h1>
			<p class="text-base sm:text-lg text-slate-600 max-w-prose">
				A comprehensive reference of the design system and styling patterns used throughout ENA. This guide ensures consistency across all pages and components.
			</p>
		</div>

		<!-- Color Palette -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Color Palette</h2>
				<p class="text-slate-600">Primary color system based on Tailwind's slate palette with accent colors for specific use cases.</p>
			</div>

			<!-- Slate Colors -->
			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
				<h3 class="text-lg font-semibold mb-4">Slate (Primary)</h3>
				<div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-50 border border-slate-200"></div>
						<p class="text-xs font-mono">slate-50</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-100 border border-slate-200"></div>
						<p class="text-xs font-mono">slate-100</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-200"></div>
						<p class="text-xs font-mono">slate-200</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-300"></div>
						<p class="text-xs font-mono">slate-300</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-400"></div>
						<p class="text-xs font-mono">slate-400</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-500"></div>
						<p class="text-xs font-mono">slate-500</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-600"></div>
						<p class="text-xs font-mono">slate-600</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-700"></div>
						<p class="text-xs font-mono">slate-700</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-800"></div>
						<p class="text-xs font-mono">slate-800</p>
					</div>
					<div class="space-y-2">
						<div class="h-16 rounded-lg bg-slate-900"></div>
						<p class="text-xs font-mono">slate-900</p>
					</div>
				</div>
			</div>

			<!-- Accent Colors -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<!-- Blue (Info) -->
				<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
					<h3 class="text-base font-semibold mb-3">Blue (Info)</h3>
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-blue-50 border border-blue-200"></div>
							<span class="text-xs font-mono">blue-50</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-blue-600"></div>
							<span class="text-xs font-mono">blue-600</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-blue-800"></div>
							<span class="text-xs font-mono">blue-800</span>
						</div>
					</div>
				</div>

				<!-- Green (Success) -->
				<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
					<h3 class="text-base font-semibold mb-3">Green (Success)</h3>
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-green-100 border border-green-300"></div>
							<span class="text-xs font-mono">green-100</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-green-700"></div>
							<span class="text-xs font-mono">green-700</span>
						</div>
					</div>
				</div>

				<!-- Red (Error/Danger) -->
				<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
					<h3 class="text-base font-semibold mb-3">Red (Error)</h3>
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-red-50 border border-red-200"></div>
							<span class="text-xs font-mono">red-50</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-red-600"></div>
							<span class="text-xs font-mono">red-600</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-red-800"></div>
							<span class="text-xs font-mono">red-800</span>
						</div>
					</div>
				</div>

				<!-- Indigo (Accent) -->
				<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
					<h3 class="text-base font-semibold mb-3">Indigo (Accent)</h3>
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-indigo-500"></div>
							<span class="text-xs font-mono">indigo-500</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-indigo-600"></div>
							<span class="text-xs font-mono">indigo-600</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-10 w-10 rounded-lg bg-indigo-700"></div>
							<span class="text-xs font-mono">indigo-700</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Typography -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Typography</h2>
				<p class="text-slate-600">Font sizes, weights, and hierarchy used throughout the application.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-8">
				<!-- Headings -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Headings</h3>
					<div class="space-y-3">
						<div>
							<h1 class="text-6xl font-extrabold">Heading 1 (6xl)</h1>
							<code class="text-xs text-slate-500">text-6xl font-extrabold</code>
						</div>
						<div>
							<h2 class="text-5xl font-extrabold">Heading 2 (5xl)</h2>
							<code class="text-xs text-slate-500">text-5xl font-extrabold</code>
						</div>
						<div>
							<h3 class="text-4xl font-extrabold">Heading 3 (4xl)</h3>
							<code class="text-xs text-slate-500">text-4xl font-extrabold</code>
						</div>
						<div>
							<h4 class="text-3xl font-bold">Heading 4 (3xl)</h4>
							<code class="text-xs text-slate-500">text-3xl font-bold</code>
						</div>
						<div>
							<h5 class="text-2xl font-bold">Heading 5 (2xl)</h5>
							<code class="text-xs text-slate-500">text-2xl font-bold</code>
						</div>
						<div>
							<h6 class="text-xl font-bold">Heading 6 (xl)</h6>
							<code class="text-xs text-slate-500">text-xl font-bold</code>
						</div>
					</div>
				</div>

				<!-- Body Text -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Body Text</h3>
					<div class="space-y-3">
						<div>
							<p class="text-xl">Large body text (xl)</p>
							<code class="text-xs text-slate-500">text-xl</code>
						</div>
						<div>
							<p class="text-lg">Medium body text (lg)</p>
							<code class="text-xs text-slate-500">text-lg</code>
						</div>
						<div>
							<p class="text-base">Base body text (base)</p>
							<code class="text-xs text-slate-500">text-base</code>
						</div>
						<div>
							<p class="text-sm">Small body text (sm)</p>
							<code class="text-xs text-slate-500">text-sm</code>
						</div>
						<div>
							<p class="text-xs">Extra small text (xs)</p>
							<code class="text-xs text-slate-500">text-xs</code>
						</div>
					</div>
				</div>

				<!-- Font Weights -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Font Weights</h3>
					<div class="space-y-2">
						<p class="font-medium">Medium weight</p>
						<p class="font-semibold">Semibold weight</p>
						<p class="font-bold">Bold weight</p>
						<p class="font-extrabold">Extrabold weight</p>
					</div>
				</div>

				<!-- Special Text Styles -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Special Styles</h3>
					<div class="space-y-2">
						<p class="text-xs font-medium uppercase tracking-wider text-slate-600">
							Section Label (uppercase tracking-wider)
						</p>
						<code class="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
							Code/Mono text (font-mono)
						</code>
					</div>
				</div>
			</div>
		</section>

		<!-- Buttons -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Buttons</h2>
				<p class="text-slate-600">Button styles and variants used across the application.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-8">
				<!-- Primary Buttons -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Primary Buttons</h3>
					<div class="flex flex-wrap gap-3">
						<button class="rounded-lg bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-800 transition duration-150">
							Primary Button
						</button>
						<button class="rounded-2xl bg-slate-900 text-white px-5 py-3 text-base font-semibold hover:bg-slate-800">
							Large Primary
						</button>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-800</code>
				</div>

				<!-- Secondary Buttons -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Secondary Buttons</h3>
					<div class="flex flex-wrap gap-3">
						<button class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition duration-150">
							Secondary Button
						</button>
						<button class="rounded-2xl border border-slate-300 px-5 py-3 text-base font-semibold hover:bg-slate-50">
							Large Secondary
						</button>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50</code>
				</div>

				<!-- Danger Buttons -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Danger Buttons</h3>
					<div class="flex flex-wrap gap-3">
						<button class="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition duration-150">
							Delete
						</button>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50</code>
				</div>

				<!-- Accent Buttons (Indigo) -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Accent Buttons (Login)</h3>
					<div class="flex flex-wrap gap-3">
						<button class="rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700 transition duration-150">
							Sign In
						</button>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700</code>
				</div>

				<!-- Icon Buttons -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Icon Buttons</h3>
					<div class="flex flex-wrap gap-3">
						<button class="rounded-lg px-3 py-2 hover:bg-slate-100">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
							</svg>
						</button>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg px-3 py-2 hover:bg-slate-100</code>
				</div>
			</div>
		</section>

		<!-- Form Elements -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Form Elements</h2>
				<p class="text-slate-600">Input fields, textareas, and form controls with consistent styling.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-8">
				<!-- Text Input -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Text Input</h3>
					<div>
						<label for="example-input" class="block text-sm font-semibold text-slate-900 mb-2">
							Label
						</label>
						<input
							id="example-input"
							type="text"
							placeholder="Placeholder text"
							class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
						/>
						<p class="mt-2 text-xs text-slate-600">Helper text goes here</p>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900</code>
				</div>

				<!-- Textarea -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Textarea</h3>
					<div>
						<label for="example-textarea" class="block text-sm font-semibold text-slate-900 mb-2">
							Bio
						</label>
						<textarea
							id="example-textarea"
							rows="4"
							placeholder="Enter your bio..."
							class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
						></textarea>
					</div>
					<code class="text-xs text-slate-500 block">resize-none</code>
				</div>

				<!-- Select -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Select</h3>
					<div>
						<label for="example-select" class="block text-sm font-semibold text-slate-900 mb-2">
							Choose an option
						</label>
						<select
							id="example-select"
							class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
						>
							<option>Option 1</option>
							<option>Option 2</option>
							<option>Option 3</option>
						</select>
					</div>
				</div>

				<!-- Checkbox -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-slate-900">Checkbox</h3>
					<div class="flex items-start gap-3">
						<input
							id="example-checkbox"
							type="checkbox"
							class="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-0"
						/>
						<div>
							<label for="example-checkbox" class="block text-sm font-semibold text-slate-900 cursor-pointer">
								Checkbox label
							</label>
							<p class="mt-1 text-xs text-slate-600">
								Optional description for the checkbox
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Cards -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Cards</h2>
				<p class="text-slate-600">Card components with consistent borders, shadows, and padding.</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Basic Card -->
				<article class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
					<h3 class="text-lg font-semibold mb-3">Basic Card</h3>
					<p class="text-sm text-slate-600 mb-4">
						Standard card with rounded-2xl corners, subtle border and shadow.
					</p>
					<code class="text-xs text-slate-500 block">rounded-2xl border border-slate-200 bg-white shadow-sm p-6</code>
				</article>

				<!-- Content Card -->
				<article class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 lg:p-10">
					<h3 class="text-lg font-semibold mb-3">Content Card</h3>
					<p class="text-sm text-slate-600 mb-4">
						Larger padding for main content areas with responsive scaling.
					</p>
					<code class="text-xs text-slate-500 block">p-6 sm:p-8 lg:p-10</code>
				</article>

				<!-- Alert Card (Info) -->
				<article class="rounded-2xl border border-blue-200 bg-blue-50 shadow-sm p-6">
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-blue-900 mb-1">Info Alert</h3>
							<p class="text-sm text-blue-800">
								Information message styled with blue colors.
							</p>
						</div>
					</div>
				</article>

				<!-- Alert Card (Error) -->
				<article class="rounded-2xl border border-red-200 bg-red-50 shadow-sm p-6">
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div class="flex-1">
							<h3 class="text-sm font-semibold text-red-900 mb-1">Error Alert</h3>
							<p class="text-sm text-red-800">
								Error message styled with red colors.
							</p>
						</div>
					</div>
				</article>
			</div>
		</section>

		<!-- Spacing & Layout -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Spacing & Layout</h2>
				<p class="text-slate-600">Consistent spacing system and layout patterns.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
				<!-- Container -->
				<div class="space-y-3">
					<h3 class="text-lg font-semibold text-slate-900">Container</h3>
					<code class="text-xs text-slate-500 block">max-w-7xl mx-auto px-4 sm:px-6 lg:px-8</code>
					<p class="text-sm text-slate-600">Standard container with responsive padding</p>
				</div>

				<!-- Spacing Scale -->
				<div class="space-y-3">
					<h3 class="text-lg font-semibold text-slate-900">Spacing Scale</h3>
					<div class="space-y-2">
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-1</div>
							<div class="flex gap-1">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-2</div>
							<div class="flex gap-2">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-3</div>
							<div class="flex gap-3">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-4</div>
							<div class="flex gap-4">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-6</div>
							<div class="flex gap-6">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="w-20 text-xs font-mono">gap-8</div>
							<div class="flex gap-8">
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
								<div class="w-8 h-8 bg-slate-200 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Border Radius -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Border Radius</h2>
				<p class="text-slate-600">Border radius scale from small to circular.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
					<div class="space-y-2">
						<div class="h-20 bg-slate-200 rounded-lg"></div>
						<p class="text-xs font-mono text-center">rounded-lg</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-slate-200 rounded-xl"></div>
						<p class="text-xs font-mono text-center">rounded-xl</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-slate-200 rounded-2xl"></div>
						<p class="text-xs font-mono text-center">rounded-2xl</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-slate-200 rounded-3xl"></div>
						<p class="text-xs font-mono text-center">rounded-3xl</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 w-20 bg-slate-200 rounded-full mx-auto"></div>
						<p class="text-xs font-mono text-center">rounded-full</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Shadows -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Shadows</h2>
				<p class="text-slate-600">Elevation system using shadows.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="space-y-2">
						<div class="h-20 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center">
							<p class="text-sm font-mono">shadow-sm</p>
						</div>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-white border border-slate-200 shadow-lg rounded-xl flex items-center justify-center">
							<p class="text-sm font-mono">shadow-lg</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Navigation Elements -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Navigation</h2>
				<p class="text-slate-600">Navigation patterns and menu styles.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
				<!-- Nav Links -->
				<div class="space-y-3">
					<h3 class="text-lg font-semibold text-slate-900">Navigation Links</h3>
					<div class="flex gap-1">
						<a href="#" class="rounded-lg px-3 py-2 hover:bg-slate-100 text-sm">Link 1</a>
						<a href="#" class="rounded-lg px-3 py-2 hover:bg-slate-100 text-sm">Link 2</a>
						<a href="#" class="rounded-lg px-3 py-2 hover:bg-slate-100 text-sm">Link 3</a>
					</div>
					<code class="text-xs text-slate-500 block">rounded-lg px-3 py-2 hover:bg-slate-100</code>
				</div>

				<!-- Dropdown Menu -->
				<div class="space-y-3">
					<h3 class="text-lg font-semibold text-slate-900">Dropdown Menu</h3>
					<div class="inline-block">
						<div class="w-48 rounded-xl border border-slate-200 bg-white shadow-lg p-2 text-sm">
							<a href="#" class="block px-3 py-2 rounded-lg hover:bg-slate-50">Menu Item 1</a>
							<a href="#" class="block px-3 py-2 rounded-lg hover:bg-slate-50">Menu Item 2</a>
							<hr class="my-1" />
							<a href="#" class="block px-3 py-2 rounded-lg hover:bg-slate-50 text-red-600">Logout</a>
						</div>
					</div>
					<code class="text-xs text-slate-500 block">rounded-xl border border-slate-200 bg-white shadow-lg p-2</code>
				</div>

				<!-- Settings Sidebar Item -->
				<div class="space-y-3">
					<h3 class="text-lg font-semibold text-slate-900">Settings Navigation (Active)</h3>
					<div class="w-64">
						<a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm bg-slate-100 font-semibold text-slate-900 border-l-4 border-slate-900 hover:bg-slate-50 transition-colors">
							<svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
							</svg>
							<span>Active Item</span>
						</a>
					</div>
					<code class="text-xs text-slate-500 block">bg-slate-100 font-semibold border-l-4 border-slate-900</code>
				</div>
			</div>
		</section>

		<!-- Container Queries -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Container Queries</h2>
				<p class="text-slate-600">Responsive components using container queries.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
				<p class="text-sm text-slate-600">
					Container queries allow components to respond to their container's size rather than the viewport.
					Use the <code class="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">@container</code> class on the parent
					and prefixes like <code class="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">@sm:</code>,
					<code class="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">@md:</code>,
					<code class="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">@lg:</code> on children.
				</p>

				<div class="@container rounded-2xl border border-slate-200 bg-slate-50 p-6">
					<div class="flex flex-col @md:flex-row gap-4">
						<div class="flex-1 rounded-lg bg-white p-4 border border-slate-200">
							<p class="text-sm">This card uses <code class="font-mono text-xs">@md:flex-row</code></p>
						</div>
						<div class="flex-1 rounded-lg bg-white p-4 border border-slate-200">
							<p class="text-sm">Resize to see it adapt</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Responsive Breakpoints -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Responsive Breakpoints</h2>
				<p class="text-slate-600">Mobile-first responsive design breakpoints.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
				<div class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<h3 class="text-sm font-semibold mb-2">Breakpoint Scale</h3>
							<ul class="space-y-2 text-sm">
								<li><code class="font-mono">sm:</code> 640px</li>
								<li><code class="font-mono">md:</code> 768px</li>
								<li><code class="font-mono">lg:</code> 1024px</li>
								<li><code class="font-mono">xl:</code> 1280px</li>
								<li><code class="font-mono">2xl:</code> 1536px</li>
							</ul>
						</div>
						<div>
							<h3 class="text-sm font-semibold mb-2">Common Patterns</h3>
							<ul class="space-y-2 text-sm text-slate-600">
								<li><code class="font-mono">px-4 sm:px-6 lg:px-8</code></li>
								<li><code class="font-mono">py-6 sm:py-8 lg:py-12</code></li>
								<li><code class="font-mono">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4</code></li>
								<li><code class="font-mono">text-3xl sm:text-4xl lg:text-6xl</code></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Usage Notes -->
		<section class="space-y-6">
			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-bold">Usage Guidelines</h2>
				<p class="text-slate-600">Best practices for maintaining design consistency.</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
				<ul class="space-y-3 text-sm text-slate-600">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Use slate colors for neutral UI elements (text, borders, backgrounds)</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Apply rounded-2xl to main cards and containers, rounded-lg for smaller elements</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Maintain consistent spacing using gap-3, gap-4, gap-6, gap-8 scale</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Use semantic colors: blue for info, green for success, red for errors/danger</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Always add focus states with focus:ring-2 for interactive elements</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Include responsive variants (sm:, md:, lg:) for all layout-affecting classes</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Use transition duration-150 for smooth hover states</span>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Section labels should use: text-xs font-medium uppercase tracking-wider text-slate-600</span>
					</li>
				</ul>
			</div>
		</section>
	</div>
</section>
