<script lang="ts">
	import { session } from '$app/stores';
	import { showFlash } from '$lib/Flash';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import MdClose from 'svelte-icons/md/MdClose.svelte';

	onMount(() => {
		const interval = setInterval(() => {
			if (!$session.flash.length) {
				return;
			}
			if ($session.flash.every((item) => showFlash(item))) return;
			
			$session.flash = $session.flash.filter((f, i) => (i === 0 ? showFlash(f) : f));
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

{#each $session.flash as flash (flash.id)}
	{@const flashColorClass =
		flash.type === 'error' ? 'bg-red-500' : flash.type === 'info' ? 'bg-blue-500' : 'bg-green-500'}
	<div
		class="p-2 flex block fixed bottom-6 right-6 w-max max-w-prose z-20 rounded-sm shadow-md {flashColorClass}"
		transition:slide
		on:click={() => ($session.flash = $session.flash.filter((f) => f.id !== flash.id))}
	>
		<p class="mr-4">{flash.message}</p>

		<div class="ml-auto w-6 h-6 text-black hover:text-gray-600 duration-400">
			<MdClose />
		</div>
	</div>
{/each}
