<script context="module" lang="ts">
	export async function load({ fetch }) {
		const response = await fetch('/auth/api/validate_request_auth');

		if (response.status === 200) {
			return {
				status: 200
			};
		} else {
			// TODO: ADD FUNCTIONALLITY THAT WILL MOVE USER TO THE PAGE THEY WERE PREVIOUSLY ON AFTER LOGIN
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	}
</script>

<slot />
