<script lang="ts" context="module">
	import Flash from '$lib/components/Flash.svelte';
	import NewUserDialog from '$lib/components/NewUserDialog.svelte';
</script>

<script lang="ts">
	import 'virtual:windi.css';
	import "../styles.css";
</script>

<!-- <NewUserDialog /> -->
<Flash />

<slot />
