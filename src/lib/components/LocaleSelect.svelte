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

<!-- Language Toggle Container with Flag Images and Labels Inside the Switch -->
<div class="fixed top-4 left-2 z-50 text-black">
    {#if currentLocale}
        <!-- Use a button for accessibility with all the original styles applied -->
        <button class="switch" role="switch" aria-checked={currentLocale === 'fr-ca'} tabindex="0" aria-label="Toggle Language" on:click={toggleLocale}>
            <div
                class="slider"
                style="transform: translateX({currentLocale === 'fr-ca' ? '0px' : '35px'}); transition: transform 0.3s ease;"
            >
                <div class="flag-circle">
                    {#if currentLocale === 'fr-ca'}
                        <img loading="lazy" src="/france.png" alt="France Flag" class="flag-image" />
                    {:else}
                        <img loading="lazy" src="/united-kingdom.png" alt="UK Flag" class="flag-image" />
                    {/if}
                </div>
            </div>
            <!-- Language Labels Inside the Switch -->
            <span class="language-label inside-label" class:fr-active={currentLocale === 'fr-ca'}>FR</span>
            <span class="language-label inside-label" class:en-active={currentLocale === 'en-us'}>EN</span>
        </button>
    {/if}
</div>

<style>
    .switch {
        position: relative;
        width: 65px;
        height: 26px;
        background-color: #f1f1f1e3;
        border-radius: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.363) inset;
    }

    /* Replace input with direct styles on slider */
    .slider {
        position: absolute;
        top: 5px;
        left: 6px;
        width: 17px;
        height: 17px;
        background-color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .flag-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.3);
    }

    .flag-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .language-label {
        position: absolute;
        top: 3px;
        font-family: 'Helvetica', Arial, sans-serif;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
        color: #333;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fr-active {
        right: 12px;
        opacity: 1;
    }

    .en-active {
        left: 12px;
        opacity: 1;
    }
</style>
