<script lang="ts">
	export let href: string | null = null;
	export let path: string;
	export let exact: boolean = false;
	export let icon: boolean = false;

	$: matches = exact ? path === href : path.startsWith(href);
	$: classes = `
		block
		p-2
		hover:text-gray-200
		flex
		flex-col
		items-center
		${matches ? 'text-white' : 'text-gray-200'}
		${icon ? 'text-xs' : 'text-sm'}
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
