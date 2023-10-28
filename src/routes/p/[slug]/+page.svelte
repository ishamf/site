<script lang="ts">
  import type { PageData } from './$types';
  import PostHeading from '$lib/components/PostHeading.svelte';

  export let data: PageData;
  $: ({ title, link, created, toc = [] } = data.post);
</script>

<div class="flex flex-row w-screen">
  <div class="side-item flex flex-row justify-end items-start">
    <nav class="toc-nav">
      <ul>
        {#each toc as tocItem}
          <li
            class="my-4 toc-item
              text-sm
              text-slate-600 dark:text-slate-400
              hover:text-slate-800 dark:hover:text-slate-200"
            style={`margin-left: ${tocItem.level - 1}rem`}
          >
            <a href={`#${tocItem.slug}`}>
              {tocItem.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  <div class="content mt-4 bg-white dark:bg-slate-800 mx-auto py-12 max-w-3xl">
    <div class="max-w-2xl mx-auto px-2">
      <PostHeading {title} {link} {created} />
      <div class="prose prose-slate dark:prose-invert font-sans mx-auto mt-4 max-w-none">
        <svelte:component this={data.component} />
      </div>
    </div>
  </div>
  <div class="side-item" />
</div>

<style lang="postcss">
  .side-item {
    flex: 1 1;
    container-type: inline-size;
    overflow: hidden;
  }

  .toc-nav {
    @apply sticky top-4 mt-32 mr-4;
  }

  @container (width < 150px) {
    .toc-nav {
      display: none;
    }
  }

  .content {
    flex: 10000 0;
  }

  .toc-item {
    display: list-item;
    list-style-type: '- ';
  }
</style>
