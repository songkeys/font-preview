export interface CharacterInfo {
	char: string;
	codePoint: number;
	name: string;
	category: string;
	isSupported: boolean;
}

export interface FontMetadata {
	name: string;
	format: string;
	size: number;
	characterCount: number;
	supportedCount: number;
}

export interface CategoryStats {
	total: number;
	supported: number;
	name: string;
}

export type CharacterCategory =
	| 'Basic Latin'
	| 'Latin Extended'
	| 'CJK'
	| 'GBK'
	| 'Cyrillic'
	| 'Greek'
	| 'Symbols & Punctuation';

export type UnicodeRange = {
	category: string;
	start: number;
	end: number;
};
