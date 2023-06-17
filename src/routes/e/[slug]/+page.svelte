<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mx-auto text-3xl font-sans max-w-xl text-center">
	{data.metadata.title}
</h1>

<div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4 px-2">
	<svelte:component this={data.component} />
</div>

<style>
</style>
