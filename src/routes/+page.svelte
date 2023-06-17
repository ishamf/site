<script lang="ts">
	import Card from './Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex max-w-5xl justify-evenly ml-auto mr-auto mt-10">
	{#each data.posts as post}
		<Card title={post.title} link={`/e/${post.slug}`}></Card>
	{/each}
</div>
