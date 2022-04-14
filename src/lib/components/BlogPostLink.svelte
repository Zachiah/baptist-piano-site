<script lang="ts">
	import type { BlogPost, User } from '@prisma/client';

	export let row: BlogPost;
	export let user: User;
</script>

<a
	href="/u/{user.username}/p/{row.slug}"
	class="text-blue-600 border-b border-transparent hover:border-b-blue-600"
>
	{row.title}
</a>
