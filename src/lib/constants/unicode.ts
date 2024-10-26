import type { CharacterCategory, UnicodeRange } from '$lib/types/font';

export const UNICODE_RANGES: UnicodeRange[] = [
	{
		category: 'Basic Latin',
		start: 0x0000,
		end: 0x007f
	},
	{
		category: 'Latin-1 Supplement',
		start: 0x0080,
		end: 0x00ff
	},
	{
		category: 'Latin Extended-A',
		start: 0x0100,
		end: 0x017f
	},
	{
		category: 'Latin Extended-B',
		start: 0x0180,
		end: 0x024f
	},
	{
		category: 'IPA Extensions',
		start: 0x0250,
		end: 0x02af
	},
	{
		category: 'Greek and Coptic',
		start: 0x0370,
		end: 0x03ff
	},
	{
		category: 'Cyrillic',
		start: 0x0400,
		end: 0x04ff
	},
	{
		category: 'General Punctuation',
		start: 0x2000,
		end: 0x206f
	},
	{
		category: 'Mathematical Operators',
		start: 0x2200,
		end: 0x22ff
	},
	{
		category: 'CJK Unified Ideographs',
		start: 0x4e00,
		end: 0x9fff
	},
	{
		category: 'Hiragana',
		start: 0x3040,
		end: 0x309f
	},
	{
		category: 'Katakana',
		start: 0x30a0,
		end: 0x30ff
	},
	{
		category: 'Hangul Syllables',
		start: 0xac00,
		end: 0xd7af
	}
];

export const UNICODE_CATEGORIES = UNICODE_RANGES.map(
	(range) => range.category
) as CharacterCategory[];
