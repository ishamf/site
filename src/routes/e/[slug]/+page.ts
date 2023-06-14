import type { SvelteComponent } from 'svelte';

export async function load({ params }) {
	const component = await import(`../../../lib/experiments/${params.slug}/+page.mdx`);

	return {
		component: component.default as typeof SvelteComponent,
		metadata: component.metadata,
	};
}
