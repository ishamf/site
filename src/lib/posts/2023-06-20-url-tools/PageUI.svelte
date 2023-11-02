<script lang="ts">
  import URLTool from './URLTool.svelte';
  import { browser } from '$app/environment';
  import { addAppStyles } from '@/utils';
  import TextButton from '@/components/TextButton.svelte';
  let urlTool: URLTool;
  const testUrl =
    'https://archive.org/wayback/available?url=https%3A%2F%2Fen.wikipedia.org%2Fw%2Findex.php%3Ftitle%3DWayback_Machine%26action%3Dhistory';
</script>

{#if browser}
  <TextButton
    on:click={() => {
      urlTool?.setUrl(testUrl);
    }}
  >
    Try it out with a complex url!
  </TextButton>

  <URLTool bind:this={urlTool} />
{:else}
  <p>Loading URL tool...</p>
{/if}
