<script>
	import '../app.css';

	const links = [
		{ url: 'https://github.com/ishamf', label: 'GitHub' },
		{ url: 'https://www.linkedin.com/in/ishamf/', label: 'LinkedIn' },
	];
</script>

<div class="min-h-screen flex flex-col">
	<main class="mt-10 flex-grow">
		<a href="/"
			><h1 class="text-center text-2xl text-slate-800 dark:text-slate-100 font-mono">
				ishamf.com
			</h1></a
		>
	
		<slot />
	</main>
	
	<footer class="max-w-xl mx-auto mt-16 mb-4 px-2 text-slate-800 dark:text-slate-200">
		Isham Faizal | {#each links as link, i}
			<a class="underline text-sky-700 dark:text-sky-300 hover:text-sky-500" href={link.url}>{link.label}</a>
			{#if i < links.length - 1}
				{' '}
			{/if}
		{/each}
	</footer>
</div>


<style>
</style>
