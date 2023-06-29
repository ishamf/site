<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="mx-auto mt-4 max-w-xl">
  <h1 class="text-3xl font-sans text-slate-900 dark:text-slate-200">Error!</h1>
  <div class="prose prose-slate dark:prose-invert font-sans max-w-none mt-4">
    <p>{$page.error?.message}</p>
  </div>
</div>
