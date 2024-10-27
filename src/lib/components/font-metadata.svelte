<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import byteSize from 'byte-size';
	import { IconInfoCircle, IconRefresh } from '@tabler/icons-svelte';

	const itemClass = 'flex items-center py-2';
	const keyClass = 'w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400';
	const valueClass = 'text-sm text-gray-800 dark:text-gray-200';

	function resetFont() {
		fontStore.reset();
	}
</script>

{#if fontStore.metadata}
	<div
		class="my-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<div
			class="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900"
		>
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-white">
					<IconInfoCircle class="mr-2 inline-block h-5 w-5" />
					Font Information
				</h3>
				<button
					on:click={resetFont}
					class="rounded-full bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
					aria-label="Reset font"
				>
					<IconRefresh class="h-5 w-5" />
				</button>
			</div>
		</div>
		<div class="divide-y divide-gray-200 px-6 dark:divide-gray-700">
			<div class={itemClass}>
				<span class={keyClass}>Name:</span>
				<span class={valueClass}>{fontStore.metadata.name}</span>
			</div>
			<div class={itemClass}>
				<span class={keyClass}>Format:</span>
				<span class={valueClass}>{fontStore.metadata.format}</span>
			</div>
			<div class={itemClass}>
				<span class={keyClass}>Size:</span>
				<span class={valueClass}>{byteSize(fontStore.metadata.size)}</span>
			</div>
			<div class={itemClass}>
				<span class={keyClass}>Character Count:</span>
				<span class={valueClass}>{fontStore.metadata.characterCount.toLocaleString()}</span>
			</div>
			<div class={itemClass}>
				<span class={keyClass}>Supported Count:</span>
				<span class={valueClass}>{fontStore.metadata.supportedCount.toLocaleString()}</span>
			</div>
		</div>
	</div>
{/if}
