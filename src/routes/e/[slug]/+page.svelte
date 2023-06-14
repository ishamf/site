<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log('Metadata: ', data.metadata);
</script>

<div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4">
	<svelte:component this={data.component} />
</div>

<div> asd asd </div>

<pre>
	asd   asd
</pre>

<style>
</style>
