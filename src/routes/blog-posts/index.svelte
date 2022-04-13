<script lang="ts" context="module">
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { BlogPost } from '@prisma/client';
	import SvelteTable from 'svelte-table';
	import dayjs from 'dayjs';

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
				blogPosts: json.blogPosts
			}
		};
	});
</script>

<script lang="ts">
	export let blogPosts: BlogPost[];
</script>

<SvelteTable
	rows={blogPosts}
	classNameTable="svelte-table"
	columns={[
		{
			key: 'title',
			value: (v) => v.title,
			title: 'Title'
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
