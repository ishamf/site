<script lang="ts" context="module">
	const observer =
		typeof IntersectionObserver === 'undefined'
			? undefined // SSR
			: new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							const callback = callbacks.get(entry.target);
							if (callback) callback(entry.isIntersecting);
						});
					},
					{ threshold: 0.5 }
			  );

	const callbacks: Map<Element, (active: boolean) => unknown> = new Map();
</script>

<script lang="ts">
	import chroma from 'chroma-js';
	import { onMount } from 'svelte';

	export let color: string;
	export let text: string;
	export let lightnessOffset = 0.2;
	export let fontLightnessOffset = 0.2;

	$: colorObj = chroma(color);
	$: lighterColor = colorObj.set(
		'oklch.l',
		Math.max(colorObj.get('oklch.l') + lightnessOffset, lightnessOffset)
	);
	$: lighterFontColor = colorObj.set(
		'oklch.l',
		Math.max(colorObj.get('oklch.l') + fontLightnessOffset, fontLightnessOffset)
	);

	let span: HTMLSpanElement;
	let isActive = false;

	onMount(() => {
		if (!observer) return;

		observer.observe(span);
		callbacks.set(span, (active) => {
			isActive = active;
		});

		return () => {
			observer.unobserve(span);
			callbacks.delete(span);
		};
	});
</script>

<span
	bind:this={span}
	class:glowing-text={isActive}
	style={`--lighter-color: ${lighterColor.css()}; --lighter-font-color: ${lighterFontColor.css()}; color: ${color};`}
	>{#each text as char}<span
			style={`animation-delay: ${-Math.random() * 2}s; animation-duration: ${
				0.7 + Math.random() * 0.8
			}s`}>{char}</span
		>{/each}</span
>

<style>
	.glowing-text span {
		animation: waverShadow infinite, waverText infinite;
	}

	@keyframes waverShadow {
		from {
			text-shadow: 0px 0px 10px currentColor, 0px 0px 10px var(--lighter-color);
		}

		50% {
			text-shadow: 0px 0px 10px currentColor, 0px 0px 20px var(--lighter-color);
		}

		to {
			text-shadow: 0px 0px 10px currentColor, 0px 0px 10px var(--lighter-color);
		}
	}

	@keyframes waverText {
		from {
			color: currentColor;
		}

		50% {
			color: var(--lighter-font-color);
		}

		to {
			color: currentColor;
		}
	}
</style>
