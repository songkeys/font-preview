import type { CharacterInfo, FontMetadata } from '$lib/types/font';
import { processFontFile } from '$lib/utils/font-processor';

class FontStore {
	characters: CharacterInfo[] = $state.raw([]);
	metadata: FontMetadata | null = $state(null);
	loadingFont = $state(false);

	searchQuery = $state('');

	filteredChars = $derived.by(() => {
		if (this.searchQuery.length === 0) {
			return this.characters;
		}

		const chars = this.searchQuery.split('').map((s) => s.toLowerCase());

		return this.characters.filter((char: CharacterInfo) =>
			chars.some((c) => char.char.toLowerCase().includes(c) || char.name.toLowerCase().includes(c))
		);
	});

	cardSize = $state(120);

	async loadFont(file: File | string) {
		if (typeof file === 'string') {
			// url
			const response = await fetch(file);
			const blob = await response.blob();
			const fileName =
				response.headers.get('Content-Disposition')?.split('filename=')[1] ||
				file.split('/').pop() ||
				'example-font';
			const mimeType = response.headers.get('Content-Type') || 'font/ttf';
			file = new File([blob], fileName, { type: mimeType });
		}
		this.loadingFont = true;
		const { characters, fontName, format, size } = await processFontFile(file);
		const fontFace = new FontFace(fontName, `url(${URL.createObjectURL(file)})`);
		await fontFace.load();
		document.fonts.add(fontFace);
		this.characters = characters;
		this.metadata = {
			name: fontName,
			format,
			size,
			characterCount: characters.length,
			supportedCount: characters.filter((c) => c.isSupported).length
		};
		this.loadingFont = false;
	}

	reset() {
		this.characters = [];
		this.metadata = null;
	}
}

export const fontStore = new FontStore();
