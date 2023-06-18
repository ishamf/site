<script lang="ts">
	import { DateTime } from 'luxon';

	export let title: string;
	export let link: string;
	export let created: Date;
</script>

<a href={link}>
    <h2 class="text-3xl font-sans text-slate-900 dark:text-slate-200">{title}</h2>
</a>

<p class="text-sm text-slate-700 dark:text-slate-300 mt-2">{DateTime.fromJSDate(created).toFormat('dd LLL yyyy')}</p>