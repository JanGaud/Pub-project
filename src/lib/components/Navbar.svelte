<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import { PrismicImage, PrismicLink } from '@prismicio/svelte';
        import { onMount, onDestroy } from 'svelte';
	import LocaleSelect from './LocaleSelect.svelte';

    // Reactive declarations to use $page store
    const logo = $page.data.nav.data.logo;
    const prismicLinks = $page.data.nav.data.link || [];
    const rootLink = $page.data.settings.data.root_link;

    let isMenuOpen = false;
    let isScrolled = false;
    let isVisible = true; // Track the visibility of the navbar
    let lastScrollY = 0; // Store the last scroll position

    // Function to toggle the mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    // Function to handle the scroll event
    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Hide navbar when scrolling down and show it when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            isVisible = false;
        } else if (currentScrollY < lastScrollY) {
            isVisible = true;
        }

        // Track whether the user has scrolled past a certain point
        isScrolled = currentScrollY > 50; // Adjust this value as needed

        // Update the last scroll position
        lastScrollY = currentScrollY;
    }

    // Ensure this code only runs on the client-side
    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
    });

    // Remove the scroll event listener on component destroy
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<!-- Navbar -->
<nav class={`h-28 w-full fixed top-0 px-4 pt-4 text-white bg-gold-gradient z-50 flex items-center justify-center md:justify-between drop-shadow-lg transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
    <div class="h-full w-[300px]">
        <PrismicLink field={rootLink}>
            {#if logo}
                <!-- Add dynamic classes based on scroll position -->
                <PrismicImage
                    field={logo}
                    class={`object-contain drop-shadow-xl transition-transform duration-300 ease-in-out ${isScrolled ? 'scale-75 -translate-y-4 transform-origin-center' : 'scale-110 translate-y-0 transform-origin-center'} h-full`}
                />
            {/if}
        </PrismicLink>
    </div>
    <button class="md:hidden absolute top-2 right-2" on:click={toggleMenu}>
        {#if isMenuOpen}
            <Icon class="w-10 h-10" icon="ic:round-close" />
        {:else}
            <Icon class="w-10 h-10" icon="iconamoon:menu-burger-horizontal" />
        {/if}
    </button>
    <div>
        <ul class="hidden md:flex items-center font-bold space-x-8 tracking-wider pb-4 uppercase">
            {#each prismicLinks as item}
                <li class="hover:border-b hover:shadow-lg drop-shadow-lg transition-all">
                    <PrismicLink field={item.link}>
                        {item.label}
                    </PrismicLink>
                </li>
            {/each}
            <li><LocaleSelect /></li>
        </ul>
    </div>
</nav>

<!-- Mobile menu -->
<div class={`fixed inset-0 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out md:hidden z-40 bg-gold-gradient backdrop-blur-md`}>
    <ul class="flex flex-col items-center justify-center font-bold space-y-8 tracking-wider h-full text-3xl uppercase">
        {#each prismicLinks as item}
            <li class="drop-shadow-lg text-white">
                <PrismicLink field={item.link} on:click={toggleMenu}>
                    {item.label}
                </PrismicLink>
            </li>
        {/each}
        <li><LocaleSelect /></li>
    </ul>
</div>
