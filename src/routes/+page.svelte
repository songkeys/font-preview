<script lang="ts">
	import FontUploader from '$lib/components/font-uploader.svelte';
	import CharacterDisplay from '$lib/components/character-display.svelte';
	import FontMetadata from '$lib/components/font-metadata.svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import FontSizeAdjuster from '$lib/components/font-size-adjuster.svelte';
	import ExampleFonts from '$lib/components/example-fonts.svelte';
	import { fontStore } from '$lib/stores/font.svelte';
</script>

<div class="container mx-auto max-w-screen-xl px-4 py-8">
	<FontUploader />
	<ExampleFonts />
	<FontMetadata />
	{#if fontStore.characters.length > 0}
		<div class="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="w-full sm:w-2/3">
				<SearchBox />
			</div>
			<FontSizeAdjuster />
		</div>
		<CharacterDisplay />
	{/if}
</div>
