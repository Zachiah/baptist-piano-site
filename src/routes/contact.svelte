<script lang="ts" context="module">
	import sendClientMiddlewareAsPropsCallback from '$lib/middleware/client/sendClientMiddlewareAsPropsCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { User } from '@prisma/client';

	export const load = withClientUser({ required: true })(sendClientMiddlewareAsPropsCallback);
</script>

<script lang="ts">
	export let user: User;

	let message: string = '';
	let statusMessage: string;
</script>

<form
	class="flex flex-col w-prose mx-auto"
	on:submit|preventDefault={async () => {
		const res = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				message: message
			})
		});

		if (res.status === 200) {
			statusMessage = 'Message sent successfully!';
			message = '';
		} else {
			statusMessage = 'There was an error sending your message. Please try again later.';
		}
	}}
>
	<p>{statusMessage ?? ''}</p>
	<label class="w-full">
		<p>Message</p>
		<textarea
			class="p-2 border border-gray-200 rounded-sm focus:border-gray-400 outline-none w-full"
			bind:value={message}
		/>
	</label>

	<button class="p-2 mt-2 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:outline-none"
		>Send</button
	>
</form>
