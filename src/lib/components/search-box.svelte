<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
</script>

<input
	type="text"
	bind:value={fontStore.searchQuery}
	class="my-2 w-full rounded border border-gray-500 bg-white/50 p-2 focus:outline-gray-500 dark:bg-gray-800/50"
	placeholder="Search characters..."
/>
