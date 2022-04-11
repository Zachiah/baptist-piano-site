<script lang="ts">
	import EditorJs from '../EditorJS.svelte';

	export let value: any;
	export let label: string;
</script>

<div class="my-4 first:mt-0 relative">
	<p>{label}</p>
	<div>
		<EditorJs bind:value />
	</div>
</div>
