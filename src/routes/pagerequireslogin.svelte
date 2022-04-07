<script context="module" lang="ts">
	import sendClient200StatusCodeCallback from '$lib/middleware/client/sendClient200StatusCodeCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({required: true})(sendClient200StatusCodeCallback);
</script>

YOU LOGGED IN!!
