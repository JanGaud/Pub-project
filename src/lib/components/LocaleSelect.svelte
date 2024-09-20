<script lang="ts">
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';

    // Set initial locale based on the current URL
    const initialLocale = $page.url.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';
    const selectedLocale = writable(initialLocale);

    // Variable to control dropdown visibility
    let dropdownVisible = false;

    const toggleDropdown = () => {
        dropdownVisible = !dropdownVisible; // Toggle the dropdown visibility
    };

    const changeLocale = (locale: string) => {
        selectedLocale.set(locale); // Set the selected locale
        dropdownVisible = false; // Close the dropdown after selection

        let currentPath = window.location.pathname;
        let newPath = '';

        if (locale === 'en-us') {
            if (!currentPath.startsWith('/en-us')) {
                newPath = `/en-us${currentPath !== '/' ? currentPath : ''}`;
            }
        } else {
            if (currentPath.startsWith('/en-us')) {
                newPath = currentPath.replace('/en-us', '');
            } else {
                newPath = currentPath;
            }
            newPath = newPath === '' ? '/' : newPath;
        }
        window.location.href = newPath; // Redirect to the new locale path
    };
</script>

<!-- Selected language flag that toggles the dropdown -->
<div class="fixed top-4 left-2 z-50">
    <button class="flex items-center justify-center" on:click={toggleDropdown}>
        {#if $selectedLocale === 'fr-ca'}
            <img src="/static/france.png" alt="France Flag" class="w-6 h-auto" />
        {:else}
            <img src="/static/united-kingdom.png" alt="UK Flag" class="w-6 h-auto" />
        {/if}
    </button>

    <!-- Dropdown that shows when the flag is clicked -->
    {#if dropdownVisible}
        <div class="dropdown bg-white border border-gray-300 rounded shadow-md mt-2">
            <!-- French Locale -->
            {#if $selectedLocale !== 'fr-ca'}
                <button class="dropdown-item flex items-center" on:click={() => changeLocale('fr-ca')}>
                    <img src="./static/france.png" alt="France Flag" class="w-4 h-auto mr-2" />
                    Français
                </button>
            {/if}
            <!-- English Locale -->
            {#if $selectedLocale !== 'en-us'}
                <button class="dropdown-item flex items-center" on:click={() => changeLocale('en-us')}>
                    <img src="./static/united-kingdom.png" alt="UK Flag" class="w-4 h-auto mr-2" />
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
