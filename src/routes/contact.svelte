<script lang="ts" context="module">
	import sendClientMiddlewareAsPropsCallback from '$lib/middleware/client/sendClientMiddlewareAsPropsCallback';
	import withClientUser from '$lib/middleware/client/withClientUser';
	import type { User } from '@prisma/client';

	export const load = withClientUser(sendClientMiddlewareAsPropsCallback);
</script>

<script lang="ts">
	export let user: User;
</script>

{user.email}
