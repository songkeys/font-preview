<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import { IconFileTypography } from '@tabler/icons-svelte';

	const exampleFonts = [
		{
			name: 'Pateglamt Script demo version.woff',
			url: 'https://fonts.cdnfonts.com/s/76593/Pateglamt Script demo version.woff'
		},
		{
			name: 'LXGWWenKai-Regular.ttf',
			url: 'https://raw.githubusercontent.com/lxgw/LxgwWenKai/main/fonts/TTF/LXGWWenKaiMono-Regular.ttf'
		},
		{
			name: 'KleeOne-Regular.ttf',
			url: 'https://raw.githubusercontent.com/fontworks-fonts/Klee/master/fonts/ttf/KleeOne-Regular.ttf'
		},
		{
			name: 'CEFFontsCJK-Regular.ttf',
			url: 'https://raw.githubusercontent.com/Partyb0ssishere/cef-fonts-cjk/v2.25/CEFFontsCJK-Regular.ttf'
		},
		{
			name: 'ChenYuluoyan-Thin.ttf',
			url: 'https://raw.githubusercontent.com/Chenyu-otf/chenyuluoyan_thin/main/ChenYuluoyan-Thin.ttf'
		},
		{
			name: 'YaHei Consolas Hybrid 1.12.ttf',
			url: 'https://raw.githubusercontent.com/yakumioto/YaHei-Consolas-Hybrid-1.12/master/YaHei%20Consolas%20Hybrid%201.12.ttf'
		}
	];

	function handleDragStart(event: DragEvent, font: { name: string; url: string }) {
		if (event.dataTransfer) {
			event.dataTransfer.setData('text/plain', font.url);
			event.dataTransfer.effectAllowed = 'copy';
		}
	}
</script>

{#if fontStore.characters.length === 0}
	<div class="mt-12">
		<h3 class="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">Example Fonts</h3>
		<p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
			Drag and drop one of these example fonts to try out the tool:
		</p>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			{#each exampleFonts as font}
				<div
					class="flex cursor-move flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
					draggable="true"
					on:dragstart={(e) => handleDragStart(e, font)}
					role="option"
					aria-selected={false}
					tabindex={0}
				>
					<IconFileTypography class="mb-2 h-8 w-8 text-gray-400" />
					<span class="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
						{font.name}
					</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
