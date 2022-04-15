<script context="module" lang="ts">
	export const load = async (event) => {
		console.log(`/api/u/${event.params.username}/p/${event.params.slug}`);
		const res = await event.fetch(`/api/u/${event.params.username}/p/${event.params.slug}`);
		if (res.status !== 200) {
			return {
				status: 404
			};
		}

		const data = await res.json();

		return {
			status: 200,
			props: {
				blogPost: data.blogPost,
				author: data.author
			}
		};
	};
</script>

<script lang="ts">
	import EditorJs from '$lib/components/EditorJS.svelte';
	import type { BlogPost, User } from '@prisma/client';
	import TagIcon from 'svelte-icons/md/MdLabel.svelte';
	import UserIcon from 'svelte-icons/md/MdPerson.svelte';
	import BlogIcon from 'svelte-icons/md/MdBook.svelte';
	import UsernameTag from '$lib/components/UsernameTag.svelte';
	import NavLink from '$lib/components/NavLink.svelte';

	export let blogPost: BlogPost;
	export let author: User;
</script>

{#if blogPost.coverImageUrl}
	<img src={blogPost.coverImageUrl} alt={blogPost.title} class="w-full h-64 object-cover" />
{/if}

<div class="flex text-2xl">
	<h1 class="">{blogPost.title}</h1>

	<div class="flex-grow" />

	<UsernameTag user={author} icon={UserIcon} href={`/u/${author.username}`} />

	<div class="mr-4" />

	<UsernameTag href={`/u/${author.username}/p/`} user={author} icon={BlogIcon} />
</div>

<EditorJs readonly value={blogPost.content} />
