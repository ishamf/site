<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import PostHeading from '$lib/components/PostHeading.svelte';

	export let title: string;
	export let link: string;
	export let created: Date;
	export let previewComponent: typeof SvelteComponent;
</script>

<div class="rounded-lg max-w-xl mx-auto px-2">
	<PostHeading {title} {link} {created} />

	<div class="prose prose-slate dark:prose-invert font-sans mt-4 max-w-none">
		<svelte:component this={previewComponent} />
		<p>
			<a href={link}>Read more...</a>
		</p>
	</div>
</div>
