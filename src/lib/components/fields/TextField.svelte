<script lang="ts">
	export let value: string;
	export let label: string;
</script>

<label class="mb-6 pt-3 rounded bg-gray-200 block">
	<p class="block text-gray-700 text-sm font-bold mb-2 ml-3">{label}</p>
	<input
		bind:value
		type="text"
		class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
	/>
</label>
