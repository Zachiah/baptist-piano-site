<script lang="ts" context="module">
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { BlogPost, User } from '@prisma/client';
	import SvelteTable from 'svelte-table';
	import dayjs from 'dayjs';
	import BlogPostLink from '$lib/components/BlogPostLink.svelte';

	export const load = withClientUser({ required: true })(async (event) => {
		const res = await event.fetch(`/api/u/${event.params.username}/p`);
		console.log(res.status);
		console.log(event.params.username);
		if (res.status !== 200) {
			return {
				status: res.status
			};
		}
		const json = await res.json();

		if (json.author.username !== event.middleware.user.username) {
			return {
				status: 403
			};
		}

		return {
			status: 200,
			props: {
				blogPosts: json.blogPosts,
				author: json.author
			}
		};
	});
</script>

<script lang="ts">
	import UsernameTag from '$lib/components/UsernameTag.svelte';
	import Button from '$lib/components/Button.svelte';
	import PlusIcon from 'svelte-icons/md/MdAdd.svelte';

	export let blogPosts: BlogPost[];
	export let author: User;
</script>

<div class="flex">
	<h1 class="p-2">
		Showing <UsernameTag user={author} />'s Blog Posts
	</h1>

	<div class="flex-grow" />

	<Button icon={PlusIcon} href="/u/{author.username}/p/new">New Post</Button>
</div>
<SvelteTable
	rows={blogPosts}
	classNameTable="svelte-table"
	columns={[
		{
			key: 'title',
			value: (v) => v.title,
			title: 'Title',
			renderComponent: {
				component: BlogPostLink,
				props: {
					user: author
				}
			}
		},
		{
			key: 'createdAt',
			value: (v) => dayjs(v.createdAt).format(`MMMM DD YYYY`),
			title: 'Created'
		},
		{
			key: 'updatedAt',
			value: (v) => dayjs(v.updatedAt).format(`MMMM DD YYYY`),
			title: 'Updated'
		}
	]}
/>
