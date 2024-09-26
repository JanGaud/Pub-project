<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import { PrismicImage, PrismicLink } from '@prismicio/svelte';

    // Reactive declarations to use $page store
    const logo = $page.data.nav.data.logo;
    const prismicLinks = $page.data.nav.data.link || [];
    const rootLink = $page.data.settings.data.root_link;

    let isMenuOpen = false;

    // Function to toggle the mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }
</script>

<nav class="h-28 w-full fixed top-0 px-4 pt-4 text-white bg-gold-gradient z-50 flex items-center justify-center md:justify-between drop-shadow-lg">
    <div class="h-full w-[275px]">
        <PrismicLink field={rootLink}>
            {#if logo}
                <PrismicImage field={logo} class="object-contain h-full drop-shadow-xl" />
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
    </ul>
</div>
