<script context="module" lang="ts">
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({ required: true })(sendClient200StatusCodeCallback);
</script>

<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import DashboardGrid from '$lib/components/DashboardGrid.svelte';
	import { session } from '$app/stores';
	import { createFlash } from '$lib/Flash';

	$: console.log($session.hasSeenNewUserDialog);
</script>

<DashboardGrid
	items={$session.user.dashboardWidgets}
	on:change={async (items) => {
		console.log('UPDATING DASHBOARD WIDGETS', items);

		$session.user.dashboardWidgets = items.detail;

		const res = await fetch('/api/updateProfile', {
			method: 'POST',
			body: JSON.stringify({
				dashboardWidgets: items.detail
			})
		});

		if (res.status !== 200) {
			$session.flash = [
				...$session.flash,
				createFlash({
					message: 'Failed to update dashboard widgets',
					type: 'error'
				})
			];
			return;
		}

		$session.flash = [
			...$session.flash,
			createFlash({
				message: 'Dashboard widgets updated',
				type: 'success'
			})
		];
	}}
	registry={{ TextInput }}
/>
