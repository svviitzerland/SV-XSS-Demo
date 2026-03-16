<script lang="ts">
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();
</script>

<svelte:head>
	<title>Sign In - SV XSS Demo.</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-4 mx-auto mt-12 max-w-md duration-500">
	<div
		class="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
	>
		<div class="px-8 py-10">
			<div class="mb-10 text-center">
				<h2 class="text-2xl font-semibold tracking-tight text-zinc-900">Welcome back</h2>
				<p class="mt-2 text-sm text-zinc-500">Sign in to access your account</p>
			</div>

			<form method="POST" class="space-y-6">
				<div>
					<label for="username" class="mb-2 block text-sm font-medium text-zinc-700">Username</label
					>
					<input
						type="text"
						name="username"
						id="username"
						required
						class="block w-full rounded-lg border-zinc-200 bg-zinc-50 px-4 py-3 shadow-sm transition-colors focus:border-zinc-900 focus:bg-white focus:ring-zinc-900 sm:text-sm"
						placeholder="e.g. admin"
					/>
				</div>

				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-zinc-700">Password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						required
						class="block w-full rounded-lg border-zinc-200 bg-zinc-50 px-4 py-3 shadow-sm transition-colors focus:border-zinc-900 focus:bg-white focus:ring-zinc-900 sm:text-sm"
						placeholder="••••••••"
					/>
				</div>

				{#if form?.error}
					<div
						class="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50/50 p-4 text-sm text-red-700"
					>
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-red-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span>{form.error}</span>
					</div>
				{/if}

				<button
					type="submit"
					class="flex w-full justify-center rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
				>
					Sign In
				</button>
			</form>
		</div>

		<div class="border-t border-zinc-100 bg-zinc-50 px-8 py-5">
			<div class="space-y-1 text-center text-xs text-zinc-500">
				<p>Demo accounts available:</p>
				<div
					class="mx-auto mt-2 flex inline-block justify-center gap-4 rounded border border-zinc-200 bg-white px-3 py-1.5 font-mono shadow-sm"
				>
					<span>admin:password</span>
					<span class="text-zinc-300">|</span>
					<span>test:testuser</span>
				</div>
			</div>
		</div>
	</div>
</div>
