<script lang="ts">
	import Card from './Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mt-4">
	{#each data.posts as post, i}
		{#if i > 0}
			<div class="mt-8" />
		{/if}
		<Card {...post} />
	{/each}
</div>
