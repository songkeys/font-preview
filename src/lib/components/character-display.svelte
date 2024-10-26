<script lang="ts">
	import { onMount } from 'svelte';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { fontStore } from '$lib/stores/font.svelte';
	import CharacterCard from './character-card.svelte';

	let containerRef: HTMLDivElement;
	let containerWidth = $state(0);

	let itemWidth = $derived(fontStore.cardSize + 4); // cardSize + gap
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
			estimateSize: () => itemWidth, // Fixed row height
			overscan: 10 // Increase overscan for smoother scrolling
		})
	);
</script>

<div bind:this={containerRef} class="flex-1 overflow-auto" style="height: calc(100vh - 200px);">
	<div
		class="overflow-x-hidden"
		style="height: {$rowVirtualizer.getTotalSize()}px; width: 100%; position: relative;"
	>
		{#each $rowVirtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
			<div
				class="absolute left-0 top-0 grid w-full gap-2 p-1"
				style="
					height: {fontStore.cardSize + 4}px;
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
