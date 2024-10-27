<script lang="ts">
	import { onDestroy } from 'svelte';
	import FontUploader from '$lib/components/font-uploader.svelte';
	import CharacterDisplay from '$lib/components/character-display.svelte';
	import FontMetadata from '$lib/components/font-metadata.svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import FontSizeAdjuster from '$lib/components/font-size-adjuster.svelte';
	import ExampleFonts from '$lib/components/example-fonts.svelte';
	import { fontStore } from '$lib/stores/font.svelte';

	let scrollTimeoutId: number | null = null;

	function handleUploadComplete() {
		scrollTimeoutId = setTimeout(() => {
			const fontInfo = document.getElementById('font-info');
			if (fontInfo) {
				const header = document.querySelector('header');
				const headerHeight = header ? header.clientHeight : 0;
				const scrollPosition = fontInfo.getBoundingClientRect().top + window.scrollY - headerHeight;
				window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
			}
		}, 100);
	}

	onDestroy(() => {
		if (scrollTimeoutId !== null) {
			clearTimeout(scrollTimeoutId);
		}
	});
</script>

<div class="container mx-auto max-w-screen-xl px-4 py-8">
	<FontUploader on:uploadComplete={handleUploadComplete} />
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
