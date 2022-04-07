<script lang="ts">
	import { Recaptcha } from 'svelte-recaptcha-v2';
	import { slide } from 'svelte/transition';
	import { CLIENT_RECAPTCHA_SITE_KEY } from '$lib/config';
</script>

<Recaptcha
	sitekey={CLIENT_RECAPTCHA_SITE_KEY}
	badge={'inline'}
	size={'recaptcha'}
	on:success
	on:error={(event) => {
		console.log(event);
	}}
	on:expired={(event) => {
		console.log(event);
	}}
	on:close={(event) => {
		console.log(event);
	}}
	on:ready={(event) => {
		console.log(event);
	}}
/>
