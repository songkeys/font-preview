<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import { IconSearch } from '@tabler/icons-svelte';
</script>

<div class="relative">
	<input
		type="text"
		bind:value={fontStore.searchQuery}
		class="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-800"
		placeholder="Search characters..."
	/>
	<IconSearch class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
</div>
