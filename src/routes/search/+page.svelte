<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	// We removed the local $state variable here to fix the Svelte reactivity warning
	// (`state_referenced_locally`). Since we're using a standard GET form submission,
	// we can just pass `data.query` directly to the `value` attribute of the input
	// instead of using `bind:value`.
</script>

<svelte:head>
	<title>Search - SV XSS Demo.</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-2xl space-y-8 duration-500">
	<div
		class="rounded-xl border border-zinc-100 bg-white p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]"
	>
		<h1 class="mb-6 text-2xl font-semibold tracking-tight text-zinc-900">Search Platform</h1>

		<form action="/search" method="GET" class="mb-8 flex gap-3">
			<input
				type="text"
				name="q"
				value={data.query}
				placeholder="Find users or comments..."
				class="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 shadow-sm transition-colors focus:border-zinc-900 focus:bg-white focus:ring-zinc-900 sm:text-sm"
			/>
			<button
				type="submit"
				class="inline-flex items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
			>
				Search
			</button>
		</form>

		{#if data.query}
			<div class="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
				<p class="text-zinc-600">
					Results for query:
					<!-- VULNERABILITY: Reflected XSS -->
					<!-- Renders the query parameter delivered directly from the server to the DOM as HTML -->
					<span class="rounded bg-zinc-200/50 px-2 py-0.5 font-medium text-zinc-900"
						>{@html data.query}</span
					>
				</p>

				<div class="mt-10 py-12 text-center text-zinc-400">
					<svg
						class="mx-auto mb-3 h-12 w-12 text-zinc-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<p>No matches found in the database.</p>
				</div>
			</div>
		{/if}
	</div>
</div>
