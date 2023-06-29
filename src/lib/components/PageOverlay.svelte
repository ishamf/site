<script lang="ts">
  import { expandedImage } from '$lib/stores';
  import { mdiClose } from '@mdi/js';

  function dismiss() {
    $expandedImage = null;
  }

  let overlay: HTMLDivElement;

  $: {
    if (overlay) {
      overlay.focus();
    }
  }
</script>

{#if $expandedImage}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer"
    tabindex="-1"
    on:click={dismiss}
    on:keydown={dismiss}
    bind:this={overlay}
  >
    <svg viewBox="0 0 24 24" role="img" class="m-2 fill-slate-100 absolute top-2 right-2 w-4 h-4">
      <title>Close Image</title>
      <path d={mdiClose} />
    </svg>
    <img class="max-w-full max-h-full" src={$expandedImage.src} alt={$expandedImage.alt} />
  </div>
{/if}
