<script lang="ts">
	import { onDestroy, onMount, type SvelteComponent } from 'svelte';

	export let items: {
		id: string;
		componentName: string;
		classes: string;
		props: any;
	}[];

	export let registry: Record<string, typeof SvelteComponent> = {};

	let Muuri;
	let mounted = false;
	let gridEl: HTMLDivElement | null = null;
	onMount(async () => {
		Muuri = (await import('muuri')).default;
		mounted = true;
	});

	let grid;
	const _cleanup = () => {
		if (grid) {
			grid.destroy();
			grid = null;
		}
	};

	$: {
		_cleanup();
		if (!mounted || !gridEl) break $;

		grid = new Muuri(gridEl, {
			dragEnabled: true
		});
	}

	onDestroy(() => {
		_cleanup();
	});
</script>

<div class="relative flex flex-wrap" bind:this={gridEl}>
	{#each items as item (item.id)}
		<div class="block absolute flex-grow p-2 z-1 {item.classes}">
			<div class="relative w-full h-full">
				<svelte:component this={registry[item.componentName]} {...item.props} />
			</div>
		</div>
	{/each}
</div>
