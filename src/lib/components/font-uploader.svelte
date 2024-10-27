<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
	import { IconUpload } from '@tabler/icons-svelte';

	let dragOver = $state(false);
	let uploadProgress = $state(0);

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			await handleFiles(files);
		} else {
			const url = event.dataTransfer?.getData('text/plain');
			if (url) {
				await handleExampleFont(url);
			}
		}
	}

	function handleFileInput(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			handleFiles(input.files);
		}
	}

	async function handleFiles(files: FileList) {
		const file = files[0];
		if (file) {
			await processFont(file);
		}
	}

	async function handleExampleFont(url: string) {
		await processFont(url);
	}

	async function processFont(file: File | string) {
		uploadProgress = 0;
		const intervalId = setInterval(() => {
			uploadProgress = Math.min(uploadProgress + 10, 90);
		}, 100);

		try {
			await fontStore.loadFont(file);
			uploadProgress = 100;
		} catch (error) {
			console.error('Error loading font:', error);
			alert('Error loading font. You may only upload TTF, WOFF, WOFF2, or OTF files.');
			uploadProgress = 0;
		} finally {
			clearInterval(intervalId);
		}
	}
</script>

<div
	class="my-10 rounded-lg border-2 border-dashed p-6 shadow-sm transition-all duration-300
	{dragOver ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}"
	ondragover={(e) => {
		e.preventDefault();
		dragOver = true;
	}}
	ondragleave={() => (dragOver = false)}
	ondrop={handleDrop}
	role="button"
	tabindex={0}
>
	<div class="flex flex-col items-center justify-center text-center">
		<IconUpload class="mb-4 h-12 w-12 text-gray-400" />
		<p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
			Drag and drop font files here
		</p>
		<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">or click to select files</p>
		<p class="text-xs text-gray-400 dark:text-gray-500">
			All processing is done in your browser locally.
		</p>
		<input
			type="file"
			accept=".ttf,.woff,.woff2,.otf"
			onchange={handleFileInput}
			class="hidden"
			id="fontInput"
		/>
		<label
			for="fontInput"
			class="mt-4 cursor-pointer rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
		>
			Select Files
		</label>
	</div>
</div>

{#if uploadProgress > 0}
	<div class="mt-4">
		<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
			<div
				class="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out dark:bg-blue-600"
				style="width: {uploadProgress}%"
			></div>
		</div>
		<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
			{uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
		</p>
	</div>
{/if}
