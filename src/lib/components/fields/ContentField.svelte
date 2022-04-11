<script lang="ts">
	import EditorJs from '../EditorJS.svelte';

	export let value: any;
	export let label: string;
</script>

<EditorJs bind:value />
