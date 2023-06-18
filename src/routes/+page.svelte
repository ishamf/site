<script lang="ts">
	import Card from './Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mt-4">
	{#each data.posts as post}
		<Card {...post}></Card>
	{/each}
</div>
