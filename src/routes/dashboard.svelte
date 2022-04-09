<script context="module" lang="ts">
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({ required: true })(sendClient200StatusCodeCallback);
</script>

<script lang="ts">
	import { session } from '$app/stores';

	import { onMount, tick } from 'svelte';
	import { browser } from '$app/env';
	import { fade } from 'svelte/transition';
	import TextInput from '$lib/components/TextInput.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import EditorJs from '$lib/components/EditorJS.svelte';
	import Muuri from '$lib/components/Muuri.svelte';
</script>

<Muuri
	items={[
		{ id: '1', componentName: 'TextInput', props: {value: 4}, classes: "w-1/3" },
		{ id: '2', componentName: 'TextInput', props: {value: 4}, classes: "w-1/3" },
		{ id: '3', componentName: 'TextInput', props: {value: 4}, classes: "w-1/3" },
		{ id: '4', componentName: 'TextInput', props: {value: 4}, classes: "w-1/3" },
		{ id: '5', componentName: 'TextInput', props: {value: 4}, classes: "w-1/3" }
	]}
	registry={{ TextInput }}
/>
