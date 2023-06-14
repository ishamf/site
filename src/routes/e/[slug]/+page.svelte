<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4 px-2">
	<svelte:component this={data.component} />
</div>

<style>
</style>
