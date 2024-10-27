<script lang="ts">
	import { onMount } from 'svelte';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { fontStore } from '$lib/stores/font.svelte';
	import CharacterCard from './character-card.svelte';

	let containerRef: HTMLDivElement;
	let containerWidth = $state(0);

	const gap = 4;

	let itemWidth = $derived(fontStore.cardSize + gap); // cardSize + gap
	let columnCount = $derived(Math.max(1, Math.floor(containerWidth / itemWidth)));
	let rowCount = $derived(Math.ceil(fontStore.filteredChars.length / columnCount));

	onMount(() => {
		const updateContainerWidth = () => {
			if (containerRef) {
				containerWidth = containerRef.offsetWidth;
			}
		};

		updateContainerWidth();
		window.addEventListener('resize', updateContainerWidth);
		return () => window.removeEventListener('resize', updateContainerWidth);
	});

	let rowVirtualizer = $derived(
		createVirtualizer({
			count: rowCount,
			getScrollElement: () => containerRef,
			estimateSize: () => itemWidth,
			overscan: 10,
			gap: gap
		})
	);
</script>

<div
	bind:this={containerRef}
	class="flex-1 overflow-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
	style="height: calc(100vh - 200px);"
>
	<div class="relative" style="height: {$rowVirtualizer.getTotalSize()}px; width: 100%;">
		{#each $rowVirtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
			<div
				class="absolute left-0 top-0 grid w-full gap-4"
				style="
					height: {fontStore.cardSize + 8}px;
					transform: translateY({virtualRow.start}px);
					grid-template-columns: repeat({columnCount}, minmax(0, 1fr));
				"
			>
				{#each fontStore.filteredChars.slice(virtualRow.index * columnCount, virtualRow.index * columnCount + columnCount) as char, i (char.codePoint + char.name + char.char + char.category)}
					<CharacterCard character={char} />
				{/each}
			</div>
		{/each}
	</div>
</div>
