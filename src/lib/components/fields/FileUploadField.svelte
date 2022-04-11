<script lang="ts">
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';

	import FileUploadIcon from 'svelte-icons/md/MdFileUpload.svelte';

	export let value: string;
	export let label: string;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			// e.target.result;

			let formData = new FormData();
			formData.append('image', new Blob([e.target.result]));
			const res = await fetch('/api/images/upload', {
				method: 'POST',
				body: formData
			});

			if (res.status !== 200) {
				$session.flash = [
					...$session.flash,
					createFlash({
						type: 'error',
						message: 'There was an error uploading the image.'
					})
				];
				return;
			}

			const json = await res.json();

			value = json.file.url

			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'success',
					message: 'Image uploaded successfully.'
				})
			];
		};
	};
</script>

<label id="app" class="flex flex-col items-center p-4 border w-40">
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
