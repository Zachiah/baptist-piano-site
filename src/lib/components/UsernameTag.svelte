<script lang="ts">
	import type { User } from '@prisma/client';
	import type { SvelteComponent } from 'svelte';

	export let user: User;
	export let icon: typeof SvelteComponent | undefined = undefined;
	export let href: string = '';
</script>

{#if href}
	<a {href} class="bg-slate-800 text-white hover:text-gray-400 duration-200 text-xs p-2 rounded-full inline-flex h-8">
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		{user.username}
	</a>
{:else}
	<span class="bg-gray-200 text-xs p-2 rounded-full inline-flex h-8">
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		{user.username}
	</span>
{/if}
