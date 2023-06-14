<script lang="ts">
	export let title: string;
	export let link: string;
</script>

<a
	href={link}
	class="grow-0 bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition duration-150"
>
	<h2 class="text-xl font-semibold dark:text-slate-200">{title}</h2>
</a>
