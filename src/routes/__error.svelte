<script lang="ts">
	import { page } from '$app/stores';

	const errors = {
		404: {
			title: 'Page not found',
			content: 'The page you are looking for does not exist.'
		},
		500: {
			title: 'Internal server error',
			content: 'Something went wrong on our end. Please try again later.'
		},
		503: {
			title: 'Service unavailable',
			content: 'The service you are looking for is temporarily unavailable.'
		},
		504: {
			title: 'Gateway timeout',
			content: 'The service you are looking for is temporarily unavailable.'
		},
		default: {
			title: 'Error',
			content: 'An error has occurred.'
		}
	};

	$: status = $page.status;
	$: message = errors[status] || errors.default;
</script>

<div class="text-center text-red-800 my-auto">
	<h1 class="text-2xl">
		{status} - {message.title}
	</h1>

	<p>
		{message.content}
	</p>
</div>
