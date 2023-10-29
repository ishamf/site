import type { SvelteComponent } from 'svelte';

export async function load({ data }) {
  const component = await import(`../../../lib/posts/${data.post.directory}/+page.mdx`);

  if (data.post.hasImports) {
    await import(`../../../lib/posts/${data.post.directory}/+imports.ts`);
  }

  return {
    ...data,
    component: component.default as typeof SvelteComponent<Record<string, never>>,
  };
}
