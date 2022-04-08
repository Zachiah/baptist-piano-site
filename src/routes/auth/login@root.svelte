<script context="module">
	import { goto, invalidate } from '$app/navigation';
	import { session } from '$app/stores';

	import { EMAIL_TOKEN_LENGTH } from '$lib/config';
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withNoClientUser from '$lib/middleware/client/withNoClientUser';
	import Joi from 'joi';

	export const load = withNoClientUser({})(sendClient200StatusCodeCallback);
</script>

<script>
	import Button from '$lib/components/Button.svelte';
	import Recaptcha from '$lib/components/Recaptcha.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { createFlash } from '$lib/Flash';

	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		recaptchaToken: Joi.string().required()
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
	let recaptchaToken = '';
</script>

<div
	class="h-screen w-screen bg-gradient-to-r from-purple-600 to-blue-600 flex flex-col items-center justify-center"
>
	<header class="max-w-lg mx-auto">
		<a href="/">
			<h1 class="text-4xl font-bold text-white text-center">Baptist Piano</h1>
		</a>
	</header>

	<main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
		<section class="mb-4">
			<h3 class="font-bold text-2xl">Welcome to BaptistPiano.com</h3>
			<p class="text-gray-600 pt-2">Sign in to your account.</p>
		</section>
		<form
			class="flex flex-col"
			on:submit|preventDefault={async () => {
				if (emailSent) {
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
						$session.user = (await response.json()).user;
						$session.flash = [
							...$session.flash,
							createFlash({
								type: 'success',
								message: 'You have successfully logged in.'
							})
						];
						$session.hasSeenNewUserDialog = false;
						await goto('/dashboard');
					} else {
						error = 'Invalid Token';
					}
				} else {
					const { error: schemaError, value } = schema.validate({ email, recaptchaToken });

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
							email,
							recaptchaKey: recaptchaToken
						})
					});

					const data = await response.json();

					if (response.status === 200) {
						emailSent = true;
					} else {
						error = data.error ?? data.message ?? data.msg ?? 'An unknown error occurred';
					}
				}
			}}
		>
			{#if error}
				<div class="text-red-500 text-center mb-4">{error}</div>
			{/if}

			{#if emailSent}
				<div class="text-gray-600 mb-4">
					A one time login code has been sent to {email}
				</div>

				<button
					type="button"
					class="inline text-gray-600 text-left mb-4 hover:text-gray-800"
					on:click={() => {
						emailSent = false;
						emailToken = '';
						recaptchaToken = '';
					}}
				>
					Change Email
				</button>

				<TextInput label="Email Code" bind:value={emailToken} />

				<Button type="submit">Log In</Button>
			{:else}
				<TextInput bind:value={email} label="Email" />

				<div class="mb-4 ml-auto">
					<Recaptcha
						on:success={(e) => {
							recaptchaToken = e.detail.token;
						}}
					/>
				</div>

				<Button type="submit">Send Code</Button>
			{/if}
		</form>
	</main>
</div>
