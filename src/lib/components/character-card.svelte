<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import type { CharacterInfo } from '$lib/types/font';

	let { character } = $props<{
		character: CharacterInfo;
	}>();

	let name = $derived(character.char);
	let codePoint = $derived(character.codePoint);
</script>

<div
	class="group relative flex flex-col items-center justify-center overflow-hidden rounded-sm bg-gray-50 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 {!character.isSupported &&
		'bg-red-300 dark:bg-red-900'}"
	style="width: {fontStore.cardSize}px; height: {fontStore.cardSize}px;"
	title={`${character.name} (U+${character.codePoint.toString(16).toUpperCase().padStart(4, '0')})`}
>
	<div
		class="text-gray-800 dark:text-gray-200"
		style="font-family: {fontStore.metadata?.name || 'system-ui'}; font-size: {fontStore.cardSize /
			3}px;"
	>
		{character.char}
	</div>
	<div
		class="text-gray-600 dark:text-gray-400"
		style="font-size: {fontStore.cardSize / 6}px; margin-top: {fontStore.cardSize / 12}px;"
	>
		U+{codePoint.toString(16).toUpperCase().padStart(4, '0')}
	</div>
	<div
		class="absolute inset-x-0 bottom-0 bg-gray-100 py-1 text-center text-xs text-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-700 dark:text-gray-300"
		style="font-family: 'system-ui'; font-size: {fontStore.cardSize / 6}px;"
	>
		{name}
	</div>
</div>
