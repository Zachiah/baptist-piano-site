<script lang="ts" context="module">
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const get = withClientUser({ required: true })(async (event) => {
		return {
			status: 200
		};
	});
</script>

<script lang="ts">
	import ContentField from '$lib/components/fields/ContentField.svelte';
	import TextInput from '$lib/components/fields/TextField.svelte';
	import FileUploadField from '$lib/components/fields/FileUploadField.svelte';
	import Button from '$lib/components/Button.svelte';
	import Joi from 'joi';
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';
	import { goto } from '$app/navigation';

	let title: string = '';
	let content: any = null;
	let coverImageUrl: string = '';

	$: console.log(coverImageUrl);
	let published: boolean = true;

	const schema = Joi.object({
		title: Joi.string().required(),
		content: Joi.object().required(),
		coverImageUrl: Joi.string().uri().optional().allow(''),
		published: Joi.boolean().required()
	});
</script>

<form
	class="p-4"
	on:submit|preventDefault={async () => {
		const { value, error } = schema.validate({
			title,
			content,
			coverImageUrl,
			published
		});

		if (error) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message: error.message
				})
			];
			return;
		}

		const res = await fetch('/api/blog-posts/create', {
			method: 'POST',
			body: JSON.stringify({
				title: value.title,
				content: value.content,
				coverImageUrl: value.coverImageUrl,
				published: value.published
			})
		});

		const resJSON = await res.json();

		if (res.status !== 200) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message:
						resJSON.message ?? resJSON.error ?? resJSON.message ?? 'An unknown error occurred'
				})
			];
		} else {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'success',
					message: `Blog post created successfully`
				})
			];

			goto('/blog-posts');
		}
	}}
>
	<h2 class="font-sans p-2 text-xl border-b border-b-gray-200 mb-4">Create New Blog Post</h2>
	<div class="flex flex-col md:flex-row md:gap-4">
		<div class="w-full md:w-60">
			<TextInput bind:value={title} label="Title" />
			<FileUploadField bind:value={coverImageUrl} label="Cover Image" />
			{#if coverImageUrl}
				<img class="my-4 w-full" src={coverImageUrl} alt="Cover Image" />
			{/if}
		</div>

		<div class="md:flex-grow">
			<ContentField bind:value={content} label="Content" />
		</div>
	</div>
	<Button type="submit">Submit</Button>
</form>
