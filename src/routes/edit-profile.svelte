<script lang="ts">
	import { session } from '$app/stores';
	import TextInput from '$lib/components/fields/TextField.svelte';
	import EditorJS from '$lib/components/EditorJS.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Joi from 'joi';
	import { createFlash } from '$lib/Flash';
	import { Gender, type Prisma } from '@prisma/client';
	import Button from '$lib/components/Button.svelte';
	import ArrowLeft from 'svelte-icons/md/MdArrowBack.svelte';

	let firstName = $session.user?.firstName ?? '';
	let lastName = $session.user?.lastName ?? '';
	let gender: 'male' | 'female' =
		$session.user?.gender === Gender.MALE
			? 'male'
			: $session.user?.gender === Gender.FEMALE
			? 'female'
			: undefined;
	let bio: Prisma.JsonValue = $session.user?.biography ?? undefined;
	let age: number = $session.user?.age ?? undefined;

	let errorMessage = '';

	const schema = Joi.object({
		firstName: Joi.string().optional().allow(''),
		lastName: Joi.string().optional().allow(''),
		gender: Joi.string().only().allow('male', 'female').optional(),
		biography: Joi.any().optional(),
		age: Joi.number().integer().min(1).max(150)
	});
</script>

<form
	class="w-prose max-w-full mx-auto p-2 flex flex-col bg-white p-4 mt-20 md:mt-0 mb-12 rounded-sm"
	on:submit|preventDefault={async () => {
		const { value, error } = schema.validate({
			firstName,
			lastName,
			gender,
			biography: bio,
			age: age
		});

		if (error) {
			errorMessage = error.message;
			return;
		}

		const res = await fetch('/api/updateProfile', {
			method: 'POST',
			body: JSON.stringify(value)
		});

		if (res.ok) {
			$session.flash = [
				...$session.flash,
				createFlash({
					type: 'success',
					message: 'Your profile has been updated.'
				})
			];

			$session.user = (await res.json()).user;
			return;
		}

		try {
			const json = await res.json();
			errorMessage = json.error ?? json.message ?? json.msg ?? JSON.stringify(json);
		} catch {
			errorMessage = 'An unknown error occurred. Please try again.';
		}
	}}
>
	<h1 class="text-2xl text-sans mb-4">Editing {$session.user.username} profile</h1>

	{#if errorMessage}
		<p class="text-red-600 text-sm">{errorMessage}</p>
	{/if}

	<TextInput label="First name" bind:value={firstName} />

	<TextInput label="Last name" bind:value={lastName} />

	<label class="flex flex-col">
		<span class="text-gray-600">Gender</span>
		<select class="mb-4" bind:value={gender}>
			<option value="male">Male</option>
			<option value="female">Female</option>
		</select>
	</label>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		<p>Bio</p>
		<EditorJS bind:value={bio} />
	</label>

	<NumberInput label="Age" bind:value={age} />

	<Button type="submit">Save</Button>
</form>
