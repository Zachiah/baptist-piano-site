<script context="module">
	import { goto } from '$app/navigation';

	import { EMAIL_TOKEN_LENGTH } from '$lib/config';
	import sendClientMiddlewareAsPropsCallback from '$lib/middleware/client/sendClientMiddlewareAsPropsCallback';
	import withNoClientUser from '$lib/middleware/client/withNoClientUser';
	import Joi from 'joi';

	export const load = withNoClientUser({})(sendClientMiddlewareAsPropsCallback);
</script>

<script>
	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
	});

	const emailTokenSchema = Joi.object({
		emailToken: Joi.string()
			.length(EMAIL_TOKEN_LENGTH)
			.required()
			.regex(/^[0-9]+$/)
	});

	let email = '';
	let emailToken = '';
	let error = '';
	let emailSent = false;
</script>

{#if emailSent}
	<form
		on:submit|preventDefault={async () => {
			const { error: tokenSchemaError, value } = emailTokenSchema.validate({ emailToken });
			if (tokenSchemaError) {
				error = tokenSchemaError.message;
				return;
			}

			const response = await fetch('/api/auth/authenticate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					emailToken
				})
			});

			if (response.status === 200) {
				await goto('/');
			} else {
				error = 'Invalid Token';
			}
		}}
		class="mx-auto p-4 shadow-md w-max flex flex-col"
	>
		{#if error}
			<div class="text-red-500 text-center mb-4">{error}</div>
		{/if}
		<label>
			Email Token
			<input class="bg-gray-100" type="text" bind:value={emailToken} />
		</label>
	</form>
{:else}
	<form
		on:submit|preventDefault={async () => {
			const { error: schemaError, value } = schema.validate({ email });

			if (schemaError) {
				error = schemaError.message;
				return;
			} else {
				error = '';
			}

			const response = await fetch(`/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				})
			});

			const data = await response.json();

			if (response.status === 200) {
				emailSent = true;
			} else {
				error = data.error ?? 'An unknown error occurred';
			}
		}}
		class="mx-auto p-4 shadow-md w-max flex flex-col"
	>
		{#if error}
			<p class="text-red-500 text-center">{error}</p>
		{/if}
		<label class="flex flex-col">
			Email
			<input class="bg-gray-100" bind:value={email} />
		</label>
		<button type="submit">Send Token</button>
	</form>
{/if}
