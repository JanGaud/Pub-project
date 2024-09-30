<!-- src/lib/components/menu/Cocktails.svelte -->
<script lang="ts">
	import MenuContainer from "./MenuContainer.svelte";

	// Define a prop to accept the entire cocktail menu data structure
	export let cocktailMenu: any[];

	// Extract the `item` array from the first element in `cocktailMenu`
	let items = cocktailMenu?.[0]?.data?.item || [];
</script>

<MenuContainer>
	{#each items as item}
		<div class="p-4 border rounded-lg bg-white shadow-md">
			<h3 class="text-xl font-semibold">{item.label}</h3>
			<p class="text-gray-600">{item.ingredients}</p>
			<p class="font-medium text-gray-800">${item.price}</p>
		</div>
	{/each}
</MenuContainer>
