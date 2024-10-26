<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';

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
	<div class="mt-8">
		<h3 class="mb-4 text-lg font-semibold">Example Fonts</h3>
		<p class="mb-4 text-sm text-gray-600">
			Drag and drop one of these example fonts to try out the tool:
		</p>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
			{#each exampleFonts as font}
				<div
					class="flex cursor-move items-center justify-center rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
					draggable="true"
					ondragstart={(e) => handleDragStart(e, font)}
					role="option"
					aria-selected={false}
					tabindex={-1}
				>
					<svg
						class="mr-2 h-6 w-6 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span class="text-sm">{font.name}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
