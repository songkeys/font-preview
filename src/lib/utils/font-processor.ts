import { parse } from 'opentype.js';
import type { UnicodeRange, CharacterInfo } from '$lib/types/font';
import { UNICODE_RANGES } from '$lib/constants/unicode';

export const processFontFile = (
	file: File
): Promise<{
	characters: CharacterInfo[];
	fontName: string;
	format: string;
	size: number;
}> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = async (e) => {
			try {
				if (!e.target?.result) {
					throw new Error('Failed to read font file');
				}

				const arrayBuffer = e.target.result as ArrayBuffer;
				const font = parse(arrayBuffer);
				const characters: CharacterInfo[] = [];

				UNICODE_RANGES.forEach((range: UnicodeRange) => {
					for (let code = range.start; code <= range.end; code++) {
						const glyph = font.charToGlyph(String.fromCodePoint(code));
						if (!glyph?.name) continue;
						const hasGlyph = !glyph.name.includes('notdef');

						characters.push({
							char: String.fromCodePoint(code),
							codePoint: code,
							name: getCharacterName(code),
							category: range.category,
							isSupported: hasGlyph
						});
					}
				});

				resolve({
					characters,
					fontName: font.names.fullName?.en || 'Unknown Font',
					format: file.type,
					size: file.size
				});
			} catch (error) {
				reject(error instanceof Error ? error : new Error('Failed to process font'));
			}
		};

		reader.onerror = () => reject(new Error('Failed to read font file'));
		reader.readAsArrayBuffer(file);
	});
};

const getCharacterName = (code: number): string => {
	try {
		return (
			String.fromCodePoint(code)
				.normalize('NFKD')
				.toUpperCase()
				// eslint-disable-next-line no-control-regex
				.replace(/[^\x00-\x7F]/g, '')
		);
	} catch {
		return `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
	}
};
