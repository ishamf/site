import type { SvelteComponent } from 'svelte';

export async function load({ data }) {
  return {
    ...data,
    posts: await Promise.all(
      data.posts.map(async (post) => {
        return {
          ...post,
          previewComponent: post.hasPreview
            ? ((await import(`../lib/posts/${post.directory}/+preview.mdx`))
                .default as typeof SvelteComponent<Record<string, never>>)
            : undefined,
        };
      })
    ),
  };
}
