<script lang="ts" context="module">
	export const load = async (event) => {
		const res = await event.fetch(`/api/blog-posts`);
		const resJson = await res.json();

		return {
			props: { blogPosts: resJson.blogPosts }
		};
	};
</script>

<script lang="ts">
	import UsernameTag from '$lib/components/UsernameTag.svelte';
	import type { BlogPost, User } from '@prisma/client';
	import AuthorIcon from 'svelte-icons/md/MdPerson.svelte';
	import BlogIcon from 'svelte-icons/md/MdBook.svelte';

	export let blogPosts: (BlogPost & { author: User })[];

	$: console.log(blogPosts);
</script>

<h1 class="text-2xl">Latest Blog Posts</h1>

{#each blogPosts as blogPost}
	<div class="flex flex-col my-2 bg-white shadow-md p-4 my-6 rounded-sm">
		{#if blogPost.coverImageUrl}
			<img src={blogPost.coverImageUrl} alt={blogPost.title} class="w-32 h-32 rounded-full mr-2" />
		{/if}

		<div class="flex bg-white">
			<a
				class="p-0 leading-sm text-purple-600 border-b border-b-transparent hover:border-b-purple-600 duration-200"
				href="/u/{blogPost.author.username}/p/{blogPost.slug}"
			>
				{blogPost.title}
			</a>

			<div class="flex-grow" />

			<UsernameTag user={blogPost.author} icon={AuthorIcon} href="/u/{blogPost.author.username}" />

			<div class="w-4" />

			<UsernameTag user={blogPost.author} icon={BlogIcon} href="/u/{blogPost.author.username}/p" />
		</div>
	</div>
{/each}
