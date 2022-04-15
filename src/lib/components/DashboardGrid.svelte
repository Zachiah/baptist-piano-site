<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, type SvelteComponent } from 'svelte';
	import DashboardPanel from './DashboardPanel.svelte';

	const dispatch = createEventDispatcher();
	export let items: {
		id: string;
		componentName: string;
		classes: string;
		title: string;
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

		grid.on('dragReleaseEnd', function (item) {
			const ids = item
				.getGrid()
				.getItems()
				.map((i) => i.getElement().dataset.id);

			items = ids.map((id) => items.find((i) => i.id === id));
			dispatch('change', items);
		});
	}

	onDestroy(() => {
		_cleanup();
	});
</script>

<div class="relative flex flex-wrap" bind:this={gridEl}>
	{#each Array.isArray(items) ? items : [] as item (item.id)}
		<div class="block absolute flex-grow p-2 z-1 {item.classes}" data-id={item.id}>
			<div class="relative">
				<DashboardPanel title={item.title}>
					<svelte:component this={registry[item.componentName]} {...item.props} />
				</DashboardPanel>
			</div>
		</div>
	{/each}
</div>
