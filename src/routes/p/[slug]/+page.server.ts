import { getPostBySlug } from '$lib/server/posts.js';
import { error } from '@sveltejs/kit';

export async function entries() {
	return [{ slug: 'text-input-styling' }];
}
export function load({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, { message: `Post not found` });
	}

	return { post };
}
