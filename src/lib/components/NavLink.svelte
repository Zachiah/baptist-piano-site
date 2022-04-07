<script lang="ts">
	export let href: string | null = null;
</script>

<li class="p-0">
	{#if href}
		<a {href} class=" block p-2 text-blue-500 hover:bg-gray-100">
			<slot />
		</a>
	{:else}
		<button on:click class="block p-2 text-blue-500 hover:bg-gray-100">
			<slot />
		</button>
	{/if}
</li>
