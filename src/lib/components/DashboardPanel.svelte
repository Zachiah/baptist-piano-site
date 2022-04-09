<script lang="ts">
	export let title: string;
	export let href: string = undefined;
</script>

<section class="bg-gray-400 text-white">
	<header class="flex bg-gray-600 text-white p-2">
		<h3>
			{#if href}
				<a {href}>
					{title}
				</a>
			{:else}
				{title}
			{/if}
		</h3>
	</header>

	<div class="">
		<slot />
	</div>
</section>
