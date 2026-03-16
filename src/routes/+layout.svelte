<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	let { data, children } = $props<{ data: LayoutData; children: import('svelte').Snippet }>();
</script>

<div
	class="flex min-h-screen flex-col bg-zinc-50 font-sans selection:bg-zinc-200 selection:text-zinc-900"
>
	<nav class="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center gap-6">
					<span class="hidden text-lg font-bold tracking-tight text-zinc-900 sm:block"
						>SV XSS Demo.</span
					>
					<a
						href="/"
						class="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
						>Home</a
					>
					<a
						href="/search"
						class="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
						>Search</a
					>
					{#if data.user}
						<a
							href="/profile"
							class="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
							>Profile</a
						>
					{/if}
				</div>
				<div>
					{#if data.user}
						<div class="flex items-center gap-4">
							<span class="text-sm font-medium text-zinc-600">@{data.user.username}</span>
							<form action="/logout" method="POST" class="inline">
								<button
									class="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
									>Log out</button
								>
							</form>
						</div>
					{:else}
						<a
							href="/login"
							class="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
							>Sign in</a
						>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<main class="mx-auto w-full max-w-5xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
