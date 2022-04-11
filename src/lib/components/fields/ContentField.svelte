<script lang="ts">
	import EditorJs from '../EditorJS.svelte';

	export let value: any;
	export let label: string;
</script>

<div class="my-4">
	<p>{label}</p>
	<EditorJs bind:value />
</div>
