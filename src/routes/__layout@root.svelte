<script>
	import NavLink from '$lib/components/NavLink.svelte';
</script>

<nav class="">
	<ul class="flex">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/about">About</NavLink>
		<NavLink href="/contact">Contact</NavLink>
	</ul>
</nav>

<slot />
