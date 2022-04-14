<script context="module" lang="ts">
	export const load = async (event) => {
		const res = await event.fetch(`/api/blog-posts/p-${event.params.username}-${event.params.slug}`);
		if (res.status !== 200) {
			return {
				status: 404
			};
		}

		const data = await res.json();

		return {
			status: 200,
			props: {
				blogPost: data.blogPost
			}
		};
	};
</script>

<script lang="ts">
	import type { BlogPost } from '@prisma/client';

	export let blogPost: BlogPost;
</script>

<p>{blogPost.title}</p>
