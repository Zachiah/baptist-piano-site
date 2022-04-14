<script lang="ts" context="module">
	import NavLink from '$lib/components/NavLink.svelte';
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({ required: false })(async (event) => {
		return {
			status: 200,
			props: {
				url: event.url
			}
		};
	});
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';
	import DashboardIcon from 'svelte-icons/md/MdDashboard.svelte';
	import BlogIcon from 'svelte-icons/md/MdBook.svelte';
	import ActivityIcon from 'svelte-icons/md/MdAccessTime.svelte';
	import ExpandIcon from 'svelte-icons/md/MdMenu.svelte';
	import ProfileIcon from 'svelte-icons/md/MdPerson.svelte';

	export let url: URL;

	let expanded = true;

	$: console.log(url.pathname);
	$: sidebar = $session.user && expanded;
</script>

<div class="h-screen flex from-purple-600 to-blue-600 bg-gradient-to-r">
	{#if sidebar}
		<aside class="bg-slate-800 w-20 shadow-md">
			<NavLink href="/dashboard" path={url.pathname} icon>
				<DashboardIcon />
				Dashboard
			</NavLink>

			<NavLink href="/blog-posts" path={url.pathname} icon>
				<BlogIcon />
				Blog Posts
			</NavLink>

			<NavLink href="/activity" path={url.pathname} icon>
				<ActivityIcon />
				Activity
			</NavLink>

			<NavLink href="/edit-profile" path={url.pathname} icon>
				<ProfileIcon />
				Edit Profile
			</NavLink>
		</aside>
	{/if}

	<div class="overflow-auto flex-grow flex flex-col duration-200" class:px-8={sidebar}>
		<nav
			class="bg-slate-800 shadow-md flex items-center duration-200 sticky top-0"
			class:rounded-b-md={sidebar}
		>
			{#if $session.user}
				<NavLink
					path={url.pathname}
					on:click={() => {
						expanded = !expanded;
					}}
					icon
				>
					<div class="w-6 mt-1">
						<ExpandIcon />
					</div>
				</NavLink>
			{/if}

			<NavLink path={url.pathname} href="/" exact>Home</NavLink>
			<NavLink path={url.pathname} href="/about">About</NavLink>
			<NavLink path={url.pathname} href="/contact">Contact</NavLink>

			<div class="flex-grow" />

			{#if $session?.user}
				<NavLink
					path={url.pathname}
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
			{:else}
				<NavLink path={url.pathname} href="/auth/login">Login</NavLink>
			{/if}
		</nav>
		<div
			class="bg-white flex-grow shadow-md p-4 flex flex-col"
			class:my-8={sidebar}
			class:rounded-sm={sidebar}
		>
			<slot />
		</div>
	</div>
</div>
