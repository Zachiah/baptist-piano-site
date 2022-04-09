<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let wrapperEl: HTMLDivElement = null!;
    export let value: any;

	onMount(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const List = (await import('@editorjs/list')).default;
		const Link = (await import('@editorjs/link')).default;
		const EditorJsHyperlink = (await import('editorjs-hyperlink')).default;

		const editor = new EditorJS({
			holder: wrapperEl,
			tools: {
				header: Header,
				list: List,
				hyperlink: EditorJsHyperlink
			},
			inlineToolbar: true,
			onChange: async (api, event) => {
				const res = await api.saver.save();
				console.log(res);

                value = res;
			},
            data: value
		});
	});
</script>

<div bind:this={wrapperEl} class="bg-white p-2 rounded-sm" />
