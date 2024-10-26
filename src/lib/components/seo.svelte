<script lang="ts">
	let { title, description, image, url } = $props<{
		title: string;
		description: string;
		image?: string;
		url: string;
	}>();

	const siteName = 'Font Preview';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={siteName} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	{#if image}
		<meta property="twitter:image" content={image} />
	{/if}
</svelte:head>
