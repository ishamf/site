import { parsePostMetadata } from '$lib/utils';

export function getPosts() {
	const posts = Object.entries(
		import.meta.glob('../posts/*/+page.mdx', { eager: true, import: 'metadata' })
	).map(([path, metadata]) => parsePostMetadata({ path, metadata }));

	return posts;
}

export function getPostBySlug(slug: string) {
	return getPosts().find((post) => post.slug === slug);
}
