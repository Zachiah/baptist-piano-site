<script lang="ts">
	import type { SvelteComponent } from 'svelte/internal';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let color: 'primary' | 'neutral' = 'primary';
	export let wrapperClass: string = '';
	export let icon: any | undefined = undefined;
	export let href: string | undefined = undefined;

	$: classes = `${
		color === 'primary'
			? 'bg-purple-600 hover:bg-purple-700 text-white'
			: 'bg-white hover:bg-gray-100 text-gray-800'
	} font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 block w-full ${
		icon ? 'px-2' : 'px-4'
	}`;
</script>

<div class={wrapperClass}>
	{#if href}
		<a on:click {type} {disabled} class={classes} {href}>
			{#if icon}
				<div class="w-8 h-8">
					<svelte:component this={icon} />
				</div>
			{:else}
				<slot />
			{/if}
		</a>
	{:else}
		<button on:click {type} {disabled} class={classes}>
			{#if icon}
				<div class="w-8 h-8">
					<svelte:component this={icon} />
				</div>
			{:else}
				<slot />
			{/if}
		</button>
	{/if}
</div>
