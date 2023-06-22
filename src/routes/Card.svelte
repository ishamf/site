<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import PostHeading from '$lib/components/PostHeading.svelte';

	export let title: string;
	export let link: string;
	export let description: string;
	export let created: Date;
	export let previewComponent: typeof SvelteComponent | undefined;
</script>

<div class="mt-4 bg-slate-50 dark:bg-slate-800 mx-auto py-12 max-w-2xl">
	<div class="max-w-xl mx-auto px-2">
		<PostHeading {title} {link} {created} />

		<div class="prose prose-slate dark:prose-invert font-sans mt-4 max-w-none">
			{#if previewComponent}
				<svelte:component this={previewComponent} />
			{:else}
				<p>{description}</p>
			{/if}
			<p>
				<a href={link}>Read more...</a>
			</p>
		</div>
	</div>
</div>
