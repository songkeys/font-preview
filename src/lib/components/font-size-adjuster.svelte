<script lang="ts">
	import { fontStore } from '$lib/stores/font.svelte';
</script>

<div class="flex items-center justify-center">
	<input type="range" min="10" max="200" bind:value={fontStore.cardSize} />
	<label for="cardSize">{fontStore.cardSize}px</label>
</div>
