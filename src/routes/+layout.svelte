<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import SEO from '$lib/components/seo.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<SEO
	title="Font Preview - Analyze and explore font characters"
	description="Upload and analyze fonts, explore supported characters, and get detailed font information with Font Preview tool."
	url="https://fontpreview.vercel.app"
	image="https://fontpreview.vercel.app/og-image.jpg"
/>

<Header />

<div class="container mx-auto max-w-screen-xl p-4">
	{@render children()}
</div>

<style>
	:global(body) {
		background-color: #f2eee2;
		color: #000;
		transition: background-color 0.3s;
	}
	:global(body.dark) {
		background-color: #1d3040;
		color: #fff;
	}
</style>
