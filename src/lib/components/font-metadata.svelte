<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import byteSize from 'byte-size';

	const itemClass = 'flex items-center';
	const keyClass = 'w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400';
	const valueClass = 'text-sm text-gray-800 dark:text-gray-200';
</script>

{#if fontStore.metadata}
	<div class="my-4 rounded-lg border border-gray-500 p-6">
		<h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Font Information</h3>
		<div class="space-y-3">
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
