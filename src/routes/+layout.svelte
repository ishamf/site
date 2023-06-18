<script>
	import { page } from '$app/stores';
	import '../app.css';

	const links = [
		{ url: 'https://github.com/ishamf', label: 'GitHub' },
		{ url: 'https://www.linkedin.com/in/ishamf/', label: 'LinkedIn' },
	];

	$: title = $page.data.pageTitle ? `${$page.data.pageTitle} | ishamf.com` : 'ishamf.com';
	$: description = $page.data.pageDescription
		? $page.data.pageDescription
		: 'Homepage of ishamf.com';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<main class="mt-10 flex-grow">
		<a href="/"
			><h1 class="text-center text-2xl text-slate-800 dark:text-slate-100 font-mono">
				ishamf.com
			</h1></a
		>

		<slot />
	</main>

	<footer class="self-stretch mt-16 mb-4 px-2 text-slate-800 dark:text-slate-200">
		<div class="max-w-xl mx-auto flex justify-between">
			<div>
				Isham Faizal | {#each links as link, i}
					<a class="text-sky-700 dark:text-sky-300 hover:text-sky-500" href={link.url}
						>{link.label}</a
					>
					{#if i < links.length - 1}
						{' - '}
					{/if}
				{/each}
			</div>

			<div>
				<a class="text-sky-700 dark:text-sky-300 hover:text-sky-500" href="/rss">RSS</a> -
				<a
					class="text-sky-700 dark:text-sky-300 hover:text-sky-500"
					href="https://github.com/ishamf/site">Source Code</a
				>
			</div>
		</div>
	</footer>
</div>
