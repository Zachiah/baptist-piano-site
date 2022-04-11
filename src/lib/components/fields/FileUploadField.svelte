<script lang="ts">
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';

	import FileUploadIcon from 'svelte-icons/md/MdFileUpload.svelte';

	export let value: string;
	export let label: string;

	const onFileSelected = async (e) => {
		let image = e.target.files[0] as File;
		let fileType = e.target.files[0].type as string;
		console.log(fileType);

		let formData = new FormData();
		formData.append('image', image);
		const res = await fetch('/api/images/upload', {
			method: 'POST',
			body: formData
		});

		const json = await res.json();

		if (res.status !== 200) {
			console.log(json);
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message:
						'There was an error uploading the image: ' +
						(json.message ?? json.msg ?? json.error ?? 'Unknown error')
				})
			];
			return;
		}

		value = json.file.url;

		$session.flash = [
			...$session.flash,
			createFlash({
				type: 'success',
				message: 'Image uploaded successfully.'
			})
		];
	};
</script>

<label id="app" class="flex flex-col items-center p-4 border">
	<div class="w-8 h-8">
		<FileUploadIcon />
	</div>

	<div>
		{label}
	</div>

	<input
		class="hidden"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
	/>
</label>
