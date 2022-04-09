<script lang="ts" context="module">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import NewUserDialog from '$lib/components/NewUserDialog.svelte';
</script>

<script lang="ts">
	import 'virtual:windi.css';
</script>

<NewUserDialog />

<slot />
