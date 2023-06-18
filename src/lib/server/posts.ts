import { parsePostMetadata } from '$lib/utils';

export function getPosts({ draft = false }: { draft?: boolean } = {}) {
	const posts = Object.entries(
		import.meta.glob('../posts/*/+page.mdx', { eager: true, import: 'metadata' })
	)
		.map(([path, metadata]) => parsePostMetadata({ path, metadata }))
		.filter((x) => !x.draft || draft)
		.sort((a, b) => b.created.getTime() - a.created.getTime());

	return posts;
}

export function getPostBySlug(slug: string) {
	return getPosts({ draft: true }).find((post) => post.slug === slug);
}
