<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	// Using Svelte 5 runes for local state
	let commentText = $state('');

	// Derived state just to demonstrate Svelte 5 feature
	let charCount = $derived(commentText.length);
</script>

<svelte:head>
	<title>Home - SV XSS Demo.</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl space-y-10 duration-500">
	<div class="py-8 text-center">
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-zinc-900">Community Discussion</h1>
		<p class="mx-auto max-w-2xl text-lg text-zinc-500">
			Share your thoughts, feedback, and ideas with the community. Please be respectful to others.
		</p>
	</div>

	<div
		class="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]"
	>
		<div class="border-b border-zinc-100 bg-zinc-50/50 px-6 py-6">
			<h2 class="text-lg font-semibold text-zinc-900">Post a new thought</h2>
		</div>
		<div class="p-6 sm:p-8">
			{#if data.user}
				<form method="POST" action="?/addComment" class="space-y-4">
					<div>
						<textarea
							name="text"
							id="text"
							rows="4"
							bind:value={commentText}
							required
							class="block w-full resize-none rounded-xl border-zinc-200 bg-zinc-50 px-4 py-3 shadow-sm transition-colors focus:border-zinc-900 focus:bg-white focus:ring-zinc-900 sm:text-sm"
							placeholder="What's on your mind?"
						></textarea>
						<div class="mt-2 flex items-center justify-between">
							<p class="text-xs font-medium text-zinc-400 {charCount > 500 ? 'text-red-500' : ''}">
								{charCount} / 500 characters
							</p>
						</div>
					</div>

					{#if form?.error}
						<div class="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
							{form.error}
						</div>
					{/if}

					{#if form?.success}
						<div
							class="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-700"
						>
							<svg
								class="h-4 w-4 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							Your thought has been published.
						</div>
					{/if}

					<div class="flex justify-end pt-2">
						<button
							type="submit"
							class="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
						>
							Publish Post
						</button>
					</div>
				</form>
			{:else}
				<div class="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm"
					>
						<svg
							class="h-6 w-6 text-zinc-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-medium text-zinc-900">Join the conversation</h3>
					<p class="mb-6 text-sm text-zinc-500">
						You need to be signed in to share your thoughts with the community.
					</p>
					<a
						href="/login"
						class="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50"
					>
						Sign in to post
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div class="space-y-6">
		<h3 class="px-1 text-xl font-semibold tracking-tight text-zinc-900">Recent Activity</h3>

		<div class="space-y-4">
			{#each data.comments as comment (comment.id)}
				<div
					class="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
				>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 font-bold text-zinc-600"
							>
								{comment.author.charAt(0).toUpperCase()}
							</div>
							<div>
								<span class="block leading-tight font-medium text-zinc-900">{comment.author}</span>
								<span class="block text-xs text-zinc-500">@{comment.author.toLowerCase()}</span>
							</div>
						</div>
						<span
							class="rounded-full border border-zinc-100 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-400"
						>
							{new Date(comment.timestamp).toLocaleDateString(undefined, {
								month: 'short',
								day: 'numeric'
							})}
						</span>
					</div>
					<!-- VULNERABILITY: Stored XSS -->
					<!-- The use of {@html } directly renders the stored input as raw HTML/JS -->
					<div class="ml-13 text-sm leading-relaxed whitespace-pre-wrap text-zinc-800">
						{@html comment.text}
					</div>
				</div>
			{:else}
				<div class="text-center py-12 bg-white rounded-xl border border-zinc-100 border-dashed">
					<p class="text-zinc-500 italic">
						No activity yet. Be the first to start the conversation.
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
