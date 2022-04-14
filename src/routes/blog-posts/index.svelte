<script lang="ts" context="module">
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { BlogPost, User } from '@prisma/client';
	import SvelteTable from 'svelte-table';
	import dayjs from 'dayjs';
import BlogPostLink from '$lib/components/BlogPostLink.svelte';

	export const load = withClientUser({ required: true })(async (event) => {
		const res = await event.fetch('/api/blog-posts', {
			method: 'GET'
		});

		if (res.status !== 200) {
			return {
				status: res.status
			};
		}

		console.log(res);
		const json = await res.json();

		return {
			status: 200,
			props: {
				blogPosts: json.blogPosts,
				user: event.middleware.user
			}
		};
	});
</script>

<script lang="ts">
	export let blogPosts: BlogPost[];
	export let user: User
</script>

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
					user: user,
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
