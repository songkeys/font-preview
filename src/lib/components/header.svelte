<script lang="ts">
	import { IconSun, IconMoon, IconBrandGithub } from '@tabler/icons-svelte';

	let darkMode = $state(false);

	function toggleDarkMode() {
		darkMode = !darkMode;
		window.document.body.classList.toggle('dark');
	}

	const buttonClass =
		'rounded-md bg-gray-200 p-1 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600';
</script>

<header
	class="sticky top-0 z-10 flex items-center justify-between bg-white/50 backdrop-blur-sm dark:bg-gray-800/50"
>
	<div class="container mx-auto flex max-w-screen-xl items-center justify-between p-4">
		<h1 class="text-3xl font-bold">Font Preview</h1>
		<div class="flex items-center gap-2">
			<a href="https://github.com/songkeys/font-preview" class={buttonClass}>
				<IconBrandGithub />
			</a>
			<button onclick={toggleDarkMode} class={buttonClass}>
				{#if darkMode}
					<IconSun />
				{:else}
					<IconMoon />
				{/if}
			</button>
		</div>
	</div>
</header>
