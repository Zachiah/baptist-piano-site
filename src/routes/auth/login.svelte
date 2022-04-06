<script context="module">
	/** @type {import('./login').Load} */
	export async function load({ fetch }) {
		const response = await fetch('/auth/api/validate_request_auth');

		if (response.status === 200) {
			// TODO: ADD FLASH MESSAGE
			return {
				redirect: '/',
				status: 302
			};
		}

		return {
			status: 200
		}
	}
</script>

<script>
	import { goto } from '$app/navigation';

	import { EMAIL_TOKEN_LENGTH } from '$lib/config';

	import Joi from 'joi';

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

			const response = await fetch('/auth/api/authenticate', {
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

			const response = await fetch(`/auth/api/login`, {
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
