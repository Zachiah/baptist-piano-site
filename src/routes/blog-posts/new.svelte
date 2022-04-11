<script lang="ts" context="module">
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({ required: true })(async (event) => {
		return {
			status: 200
		};
	});
</script>

<script lang="ts">
	import ContentField from '$lib/components/fields/ContentField.svelte';
	import EditorJs from '$lib/components/EditorJS.svelte';
	import TextInput from '$lib/components/fields/TextField.svelte';
	import FileUploadField from '$lib/components/fields/FileUploadField.svelte';

	let title: string = '';
	let content: any = null;
	let coverImageUrl: string = '';

	$: console.log(coverImageUrl);
	let published: boolean = false;
</script>

<form>
	<TextInput bind:value={title} label="Title" />
	<ContentField bind:value={content} label="Content" />
	<FileUploadField bind:value={coverImageUrl} label="Cover Image" />
	<img src={coverImageUrl} />
</form>
