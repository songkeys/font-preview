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
	class="my-10 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-500 p-4 text-center transition-colors"
	class:bg-gray-50={dragOver}
	ondragover={(e) => {
		e.preventDefault();
		dragOver = true;
	}}
	ondragleave={() => (dragOver = false)}
	ondrop={handleDrop}
	role="button"
	tabindex={0}
>
	<IconUpload class="mb-2" />
	<p>Drag and drop font files here, or click to select files</p>
	<p class="text-sm text-gray-500">All processing is done in your browser locally.</p>
	<input
		type="file"
		accept=".ttf,.woff,.woff2,.otf"
		onchange={handleFileInput}
		class="hidden"
		id="fontInput"
	/>
	<label
		for="fontInput"
		class="mt-2 inline-block cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
		>Select Files</label
	>
</div>

{#if uploadProgress > 0}
	<div class="mt-4">
		<div class="h-2 w-full rounded-full bg-gray-200">
			<div
				class="h-full rounded-full bg-gray-500 transition-all duration-300 ease-out"
				style="width: {uploadProgress}%"
			></div>
		</div>
		<p class="mt-2 text-center text-sm text-gray-600">
			{uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
		</p>
	</div>
{/if}
