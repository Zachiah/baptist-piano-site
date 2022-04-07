<script lang="ts" context="module">
	import NavLink from '$lib/components/NavLink.svelte';
	import sendClientMiddlewareAsPropsCallback from '$lib/middleware/client/sendClientMiddlewareAsPropsCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { User } from '@prisma/client';

	export const load = withClientUser({ required: false })(sendClientMiddlewareAsPropsCallback);
</script>

<script lang="ts">
import { goto } from '$app/navigation';

	export let user: User | null = null;
</script>

<nav class="">
	<ul class="flex">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/about">About</NavLink>
		<NavLink href="/contact">Contact</NavLink>
		<div class="flex-grow" />

		{#if user}
			<NavLink href="/dashboard">Dashboard</NavLink>
			<NavLink
				on:click={async () => {
					const request = await fetch('/api/auth/logout', {
						method: "POST"
					});
					goto('/auth/login');
				}}>Logout</NavLink
			>
		{:else}
			<NavLink href="/login">Login</NavLink>
		{/if}
	</ul>
</nav>

<slot />
