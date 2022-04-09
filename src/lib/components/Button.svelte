<script lang="ts">
	import type { SvelteComponent } from 'svelte/internal';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let color: 'primary' | 'neutral' = 'primary';
	export let wrapperClass: string = '';
	export let icon: any | undefined = undefined;
	export let href: string | undefined = undefined;
</script>

<div class={wrapperClass}>
	<svelte:element
	    this={href? "a" : "button"}
		href={href}
		on:click
		{type}
		{disabled}
		class="{color === 'primary'
			? 'bg-purple-600 hover:bg-purple-700 text-white'
			: 'bg-white hover:bg-gray-100 text-gray-800'} font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 block w-full {icon
			? 'px-2'
			: 'px-4'}"
	>
		{#if icon}
			<div class="w-8 h-8">
				<svelte:component this={icon} />
			</div>
		{:else}
			<slot />
		{/if}
		</svelte:element>
</div>
