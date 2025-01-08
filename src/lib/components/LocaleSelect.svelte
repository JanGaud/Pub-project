<script lang="ts">
    import { selectedLocale, changeLocale } from '$lib/stores/lang';
    import { onMount } from 'svelte';

    let currentLocale: string | null = null;

    // Subscribe to the locale store and get the current value on component mount
    onMount(() => {
        selectedLocale.subscribe((value) => {
            currentLocale = value;
        });
    });

    // Function to toggle locale without refreshing the page
    const toggleLocale = () => {
        if (currentLocale === 'fr-ca') {
            changeLocale('en-us');
        } else {
            changeLocale('fr-ca');
        }
    };
</script>

<!-- Language Toggle Button -->
<div class="z-50 border py-1 px-2 bg-background bg-opacity-40">
    {#if currentLocale}
        <button
            class="flex space-x-2 text-sm text-white focus:outline-none"
            on:click={toggleLocale}
            aria-label="Toggle Language"
        >
            <span
                class="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                class:after:scale-x-100={currentLocale === 'fr-ca'}
            >
                FR
            </span>
            <span>/</span>
            <span
                class="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                class:after:scale-x-100={currentLocale === 'en-us'}
            >
                EN
            </span>
        </button>
    {/if}
</div>
