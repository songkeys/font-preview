<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import { IconZoomIn, IconZoomOut } from '@tabler/icons-svelte';
</script>

<div class="flex items-center space-x-4">
	<button
		on:click={() => (fontStore.cardSize = Math.max(10, fontStore.cardSize - 10))}
		class="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
		aria-label="Decrease font size"
	>
		<IconZoomOut class="h-5 w-5" />
	</button>
	<input
		type="range"
		min="10"
		max="200"
		bind:value={fontStore.cardSize}
		class="h-2 w-32 appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
	/>
	<button
		on:click={() => (fontStore.cardSize = Math.min(200, fontStore.cardSize + 10))}
		class="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
		aria-label="Increase font size"
	>
		<IconZoomIn class="h-5 w-5" />
	</button>
	<span class="w-5 text-right text-sm font-medium tabular-nums text-gray-600 dark:text-gray-400"
		>{fontStore.cardSize}px</span
	>
</div>
