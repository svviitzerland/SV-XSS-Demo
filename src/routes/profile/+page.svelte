<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	// Binding to a DOM element to demonstrate DOM XSS
	let profileStatusContainer = $state<HTMLElement | null>(null);
	let statusSource = $state('Loading user status...');

	// VULNERABILITY: DOM XSS
	// The $effect rune will run on the client side, read from the un-sanitized
	// location.hash, and write it directly to the innerHTML of a DOM element,
	// bypassing Svelte's built-in protections.
	$effect(() => {
		// Only run if the container is ready
		if (!profileStatusContainer) return;

		const hash = window.location.hash;
		if (hash.startsWith('#status=')) {
			// Extract the payload directly from the URL hash
			const statusPayload = decodeURIComponent(hash.substring(8));

			// Unsafe DOM manipulation
			profileStatusContainer.innerHTML = statusPayload;
			statusSource = 'Status updated from URL hash!';
		} else {
			profileStatusContainer.innerHTML =
				'<span class="text-zinc-400 italic">No status set - Add <code>#status=...</code> to URL</span>';
			statusSource = 'Default status';
		}
	});
</script>

<svelte:head>
	<title>Profile - SV XSS Demo.</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl space-y-8 duration-500">
	<div
		class="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
	>
		<!-- Banner -->
		<div class="relative h-40 w-full overflow-hidden bg-zinc-900">
			<!-- Decorative pattern -->
			<div
				class="absolute inset-0 opacity-10"
				style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"
			></div>
		</div>

		<div class="relative px-6 py-6 sm:px-10">
			<!-- Avatar -->
			<div
				class="absolute -top-16 left-6 flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm sm:left-10"
			>
				<div
					class="flex h-full w-full items-center justify-center bg-zinc-100 text-5xl font-bold text-zinc-300"
				>
					{data.user?.name.charAt(0) || 'U'}
				</div>
			</div>

			<!-- User Info -->
			<div class="mt-20 sm:mt-0 sm:ml-40 sm:pt-2">
				<h1 class="text-3xl font-bold tracking-tight text-zinc-900">{data.user?.name}</h1>
				<p class="font-medium text-zinc-500">@{data.user?.username}</p>
				<div class="mt-4 flex gap-3 text-sm">
					<span class="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-zinc-700"
						>Member</span
					>
				</div>
			</div>

			<!-- Status Section -->
			<div class="mt-12 overflow-hidden rounded-xl border border-zinc-100 shadow-sm">
				<div
					class="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-5 py-4"
				>
					<h2 class="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
						Current Status
					</h2>
					<span
						class="rounded bg-zinc-200/50 px-2 py-1 text-[10px] font-semibold tracking-wider text-zinc-600 uppercase"
						>{statusSource}</span
					>
				</div>

				<div class="min-h-[80px] bg-white p-6" bind:this={profileStatusContainer}>
					<!-- Content will be injected here by the $effect -->
				</div>
			</div>

			<!-- Information Footer -->
			<div
				class="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-blue-800"
			>
				<svg
					class="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p>
					<strong>Tip:</strong> You can set a custom status by modifying the URL fragment. Try
					appending
					<code
						class="ml-1 rounded border border-blue-200 bg-white/60 px-1.5 py-0.5 font-mono text-xs"
						>#status=Your Status Here</code
					> to the URL in your browser.
				</p>
			</div>
		</div>
	</div>
</div>
