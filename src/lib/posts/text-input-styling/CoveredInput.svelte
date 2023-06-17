<script lang="ts">
	export let value: string;
	export let rows = 1;
</script>

<div class="container dark:bg-slate-900 bg-slate-100">
	<div class="p-1 cover">
		<slot />
	</div>

	<textarea {rows} class="p-1 input bg-transparent" bind:value />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
	}

	.input {
		width: 100%;
		color: rgba(0, 0, 0, 0);

		position: relative;
		resize: none;

		/* Not exactly the right font color, but close enough */
		caret-color: #000;
	}

	@media (prefers-color-scheme: dark) {
		.input {
			caret-color: #fff;
		}
	}

	.cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		white-space: pre-wrap;

		/* Disable interactions */
		pointer-events: none;
	}
</style>
