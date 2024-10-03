<script lang="ts">
	import { selectedLocale, changeLocale } from '$lib/stores/lang';
	import { onMount } from 'svelte';

	// Variable to control dropdown visibility
	let dropdownVisible = false;

	// Toggle the dropdown visibility
	const toggleDropdown = () => {
		dropdownVisible = !dropdownVisible;
	};

	onMount(() => {
		selectedLocale.subscribe((value) => {
			console.log(`Current locale: ${value}`);
		});
	});
</script>

<!-- Selected language flag that toggles the dropdown -->
<div class="fixed top-4 left-2 z-50 text-black">
	<button class="flex items-center justify-center gap-1" on:click={toggleDropdown}>
		{#if $selectedLocale === 'fr-ca'}
			<img src="/france.png" alt="France Flag" class="w-6 h-auto" /><span>FR</span>
		{:else}
			<img src="/united-kingdom.png" alt="UK Flag" class="w-6 h-auto" /><span>EN</span>
		{/if}
	</button>

	<!-- Dropdown that shows when the flag is clicked -->
	{#if dropdownVisible}
		<div class="dropdown bg-white border border-gray-300 rounded shadow-md mt-2">
			<!-- French Locale -->
			{#if $selectedLocale !== 'fr-ca'}
				<button class="dropdown-item flex items-center" on:click={() => changeLocale('fr-ca')}>
					Français
				</button>
			{/if}
			<!-- English Locale -->
			{#if $selectedLocale !== 'en-us'}
				<button class="dropdown-item flex items-center" on:click={() => changeLocale('en-us')}>
					English
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: absolute;
		top: 100%; /* Positioned below the selected flag */
		left: 0;
		min-width: 120px;
		z-index: 1000; /* Ensure it is above other elements */
		background-color: white;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.dropdown-item {
		padding: 8px;
		background-color: white;
		cursor: pointer;
		width: 100%;
		text-align: left;
	}
	.dropdown-item:hover {
		background-color: #f0f0f0;
	}
</style>
