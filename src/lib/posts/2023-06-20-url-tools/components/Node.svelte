<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { mdiPlus, mdiClose } from '@mdi/js';
	import type { URLElement } from '../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';

	export let key: string | null;
	export let url: URLElement;
	export let disabled = false;
	export let isDraft = false;

	const dispatch = createEventDispatcher();

	let isValidURL = false;

	$: isRootNode = typeof key !== 'string';
	$: shouldShowAddButton = isValidURL && (!url.params || url.params.length === 0);
	$: shouldShowRemoveButton = typeof key === 'string' && !isDraft;

	$: {
		try {
			new URL(url.value);
			isValidURL = true;
		} catch (e) {
			isValidURL = false;
		}
	}

	$: {
		if (url.params && url.params.every((x) => x.key)) {
			url.params = [...(url.params ?? []), { key: '', url: { value: '' } }];
		} else if (isRootNode && url.value && !url.params) {
			url.params = [{ key: '', url: { value: '' } }];
		}
	}
</script>

<div class="my-4">
	<div class="flex flex-row justify-stretch">
		{#if typeof key === 'string'}
			<Input bind:value={key} {disabled} placeholder="Key..." />
			<div class="mr-4" />
		{/if}
		<Input
			bind:value={url.value}
			{disabled}
			placeholder={typeof key === 'string' ? 'Value...' : 'Enter URL...'}
		/>
		{#if shouldShowAddButton}
			<div class="mr-4" />
			<Button
				title="Add parameter"
				icon={mdiPlus}
				disabled={disabled || !isValidURL}
				on:click={() => {
					if (!url.params) url.params = [];

					url.params = [
						...url.params,
						{
							key: '',
							url: {
								value: '',
							},
						},
					];
				}}
			/>
		{/if}

		{#if shouldShowRemoveButton}
			<div class="mr-4" />
			<Button
				title="Remove parameter"
				icon={mdiClose}
				{disabled}
				on:click={() => {
					dispatch('remove', key);
				}}
			/>
		{:else if !isRootNode}
			<div class="mr-16" />
		{/if}
	</div>

	{#if url.params}
		<div class="ml-4">
			{#each url.params as param, i}
				<svelte:self
					bind:key={param.key}
					bind:url={param.url}
					disabled={disabled || !isValidURL}
					isDraft={i === url.params.length - 1}
					on:remove={() => {
						if (!url.params) return;
						url.params = url.params.filter((x) => x !== param);
					}}
				/>
			{/each}
		</div>
	{/if}
</div>
