<script lang="ts">
	import FontUploader from '$lib/components/font-uploader.svelte';
	import CharacterDisplay from '$lib/components/character-display.svelte';
	import FontMetadata from '$lib/components/font-metadata.svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import FontSizeAdjuster from '$lib/components/font-size-adjuster.svelte';
	import { fontStore } from '$lib/stores/font.svelte';
</script>

<FontUploader />
<FontMetadata />
{#if fontStore.characters.length > 0}
	<div class="flex items-center justify-between gap-2">
		<SearchBox />
		<FontSizeAdjuster />
	</div>
	<CharacterDisplay />
{/if}
