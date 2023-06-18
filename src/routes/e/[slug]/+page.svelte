<script lang="ts">
	import type { PageData } from './$types';
	import PostHeading from '$lib/components/PostHeading.svelte';

	export let data: PageData;
	$: ({ title, link, created } = data.metadata);
</script>

<div class="max-w-xl mx-auto px-2 mt-4">
	<PostHeading {title} {link} {created} />
	<div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4  max-w-none">
		<svelte:component this={data.component} />
	</div>
</div>
