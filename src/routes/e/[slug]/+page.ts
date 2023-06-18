import { parsePostMetadata } from '$lib/utils.js';
import type { SvelteComponent } from 'svelte';

export async function load({ params }) {
	const component = await import(`../../../lib/posts/${params.slug}/+page.mdx`);

	return {
		component: component.default as typeof SvelteComponent,
		metadata: parsePostMetadata({ slug: params.slug, metadata: component.metadata }),
	};
}
