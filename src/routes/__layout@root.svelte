<script lang="ts" context="module">
	import NavLink from '$lib/components/NavLink.svelte';
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({ required: false })(sendClient200StatusCodeCallback);
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';
</script>

<nav class="">
	<ul class="flex">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/about">About</NavLink>
		<NavLink href="/contact">Contact</NavLink>

		<div class="flex-grow" />

		{#if $session.user}
			<NavLink href="/dashboard">Dashboard</NavLink>
			<NavLink
				on:click={async () => {
					const request = await fetch('/api/auth/logout', {
						method: 'POST'
					});
					$session.user = null;
					$session.flash = [
						...$session.flash,
						createFlash({
							type: 'info',
							message: 'You have successfully logged out.'
						})
					];
					// clear localStorage
					localStorage.clear();
				}}>Logout</NavLink
			>
			<NavLink href="/edit-profile">Edit Profile</NavLink>
		{:else}
			<NavLink href="/auth/login">Login</NavLink>
		{/if}
	</ul>
</nav>

<div class="">
	<slot />
</div>
