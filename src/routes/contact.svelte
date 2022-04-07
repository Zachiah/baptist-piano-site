<script lang="ts" context="module">
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';
	import Recaptcha from '$lib/components/Recaptcha.svelte';
	import { session } from '$app/stores';

	export const load = withClientUser({ required: true })(sendClient200StatusCodeCallback);
</script>

<script lang="ts">
	let message: string = '';
	let recaptchaKey = '';

	import { createFlash } from '$lib/Flash';
</script>

<form
	class="flex flex-col w-prose mx-auto"
	on:submit|preventDefault={async () => {
		let oldRecaptchaKey = recaptchaKey;
		recaptchaKey = '';
		if (!oldRecaptchaKey) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message: 'Please verify that you are not a robot.'
				})
			];
			return;
		}

		if (!message.trim()) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message: 'Please enter a message.'
				})
			];
			return;
		}

		const res = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				message: message,
				recaptchaKey: oldRecaptchaKey
			})
		});

		if (res.status === 200) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'success',
					message: 'Your message has been sent.'
				})
			];
			message = '';
		} else {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'error',
					message: 'There was an error sending your message.'
				})
			];
		}
	}}
>
	<label class="w-full">
		<p>Message</p>
		<textarea
			class="p-2 border border-gray-200 rounded-sm focus:border-gray-400 outline-none w-full"
			bind:value={message}
		/>
	</label>

	{#if !recaptchaKey}
		<div class="ml-auto">
			<Recaptcha
				on:success={(event) => {
					recaptchaKey = event.detail.token;

					$session.flash = [
						...$session.flash,
						createFlash({
							type: 'info',
							message: 'Recaptcha verified.'
						})
					];
				}}
			/>
		</div>
	{/if}
	<button class="p-2 mt-2 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:outline-none"
		>Send</button
	>
</form>
