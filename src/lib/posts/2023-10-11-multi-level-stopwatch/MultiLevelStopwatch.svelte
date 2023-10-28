<svelte:options customElement={{ tag: 'multi-level-stopwatch', extend: addAppStyles }} />

<script lang="ts">
  import TextButton from '@/components/TextButton.svelte';
  import type { StopwatchData } from './types';
  import { addAppStyles } from '@/utils';

  import { browser } from '$app/environment';

  const defaultData: StopwatchData = {
    levels: [],
  };

  const storageKey = 'multi-level-stopwatch';

  const data: StopwatchData = browser ? JSON.parse(
    localStorage.getItem(storageKey) ?? JSON.stringify(defaultData)
  ) : defaultData;

  $: {
    browser && localStorage.setItem(storageKey, JSON.stringify(data));
  }
</script>

<TextButton>Start</TextButton>
