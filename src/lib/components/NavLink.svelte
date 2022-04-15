<script lang="ts">
	export let href: string | null = null;
	export let path: string;
	export let exact: boolean = false;
	export let icon: boolean = false;

	$: matches = exact ? path === href : path.startsWith(href);
	$: classes = `
		block
		p-2
		hover:text-gray-400
		flex
		flex-col
		items-center
		duration-200
		${matches ? 'text-gray-400' : 'text-white'}
		${icon ? 'text-xs' : matches ? 'text-md' : 'text-sm'}
	`;
</script>

{#if href}
	<a {href} class={classes}>
		<slot />
	</a>
{:else}
	<button on:click class={classes}>
		<slot />
	</button>
{/if}
