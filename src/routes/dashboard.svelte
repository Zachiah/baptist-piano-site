<script context="module" lang="ts">
	import sendClientMiddlewareAsPropsCallback from '$lib/middleware/client/sendClientMiddlewareAsPropsCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';

	export const load = withClientUser({required: true})(sendClientMiddlewareAsPropsCallback);
</script>
