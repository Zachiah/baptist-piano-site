<script lang="ts">
	export let href: string;
</script>

<li class="p-0">
	<a {href} class=" block p-2 text-blue-500 hover:bg-gray-100">
		<slot />
	</a>
</li>
