<script lang="ts">
	import { session } from '$app/stores';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import TextInput from '$lib/components/TextInput.svelte';
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

<div class="min-h-screen w-full bg-gradient-to-r from-purple-600 to-blue-600 flex flex-col px-2">
	<Button
		wrapperClass="absolute top-4 left-4 sticky top-4 w-12"
		color="neutral"
		icon={ArrowLeft}
		href={'/'}
	/>

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
		<h1 class="text-2xl text-sans">Welcome to Baptist Piano</h1>

		<p class="text-gray-600 py-2">Please fill in your profile so we can get to know you better.</p>

		<p class="text-gray-600 py-2 pb-4">
			Only provide as much information as you want to be public.
		</p>

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
</div>
