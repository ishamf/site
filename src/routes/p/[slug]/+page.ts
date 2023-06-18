import type { SvelteComponent } from 'svelte';

export async function load({ data }) {
	const component = await import(`../../../lib/posts/${data.post.directory}/+page.mdx`);

	return {
		...data,
		component: component.default as typeof SvelteComponent,
	};
}
