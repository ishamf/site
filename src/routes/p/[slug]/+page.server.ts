import { getPostBySlug, getPosts } from '$lib/server/posts.js';
import { error } from '@sveltejs/kit';

export async function entries() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}
export async function load({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw error(404, { message: `Post not found` });
  }

  return { post, pageTitle: post.title };
}
