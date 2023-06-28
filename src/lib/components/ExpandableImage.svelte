<script lang="ts" context="module">
	import { browser } from '$app/environment';
	let screenWidth = writable(browser ? window.innerWidth : 0);

	browser &&
		window.addEventListener('resize', () => {
			screenWidth.set(window.innerWidth);
		});
</script>

<script lang="ts">
	import { expandedImage } from '$lib/stores';
	import { writable } from 'svelte/store';
	export let src: string;
	export let alt: string;

	let currentWidth = 0;

	$: canExpandImage = $screenWidth && currentWidth && currentWidth + 100 < $screenWidth;
</script>

<button
	class="block relative"
	class:cursor-default={!canExpandImage}
	bind:clientWidth={currentWidth}
	on:click={() => {
		if (canExpandImage) {
			$expandedImage = { src, alt };
		}
	}}
>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img {...$$props} />
</button>
