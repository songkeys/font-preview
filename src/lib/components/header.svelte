<script lang="ts">
	import { IconSun, IconMoon, IconBrandGithub } from '@tabler/icons-svelte';

	let darkMode = $state(false);

	function toggleDarkMode() {
		darkMode = !darkMode;
		window.document.body.classList.toggle('dark');
	}
</script>

<header
	class="sticky top-0 z-10 bg-white/80 shadow-md backdrop-blur-sm transition-colors duration-300 dark:bg-gray-800/80"
>
	<div class="container mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
		<h1 class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Font Preview</h1>
		<div class="flex items-center space-x-4">
			<a
				href="https://github.com/songkeys/font-preview"
				class="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				aria-label="GitHub repository"
			>
				<IconBrandGithub class="h-5 w-5" />
			</a>
			<button
				onclick={toggleDarkMode}
				class="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				aria-label="Toggle dark mode"
			>
				{#if darkMode}
					<IconSun class="h-5 w-5" />
				{:else}
					<IconMoon class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>
</header>
