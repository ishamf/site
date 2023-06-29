<script lang="ts">
  import type { PageData } from './$types';
  import PostHeading from '$lib/components/PostHeading.svelte';

  export let data: PageData;
  $: ({ title, link, created } = data.post);
</script>

<div class="mt-4 bg-slate-50 dark:bg-slate-800 mx-auto py-12 max-w-2xl">
  <div class="max-w-xl mx-auto px-2">
    <PostHeading {title} {link} {created} />
    <div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4 max-w-none">
      <svelte:component this={data.component} />
    </div>
  </div>
</div>
