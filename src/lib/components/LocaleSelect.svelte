<script lang="ts">
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';

    const initialLocale = $page.url.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';
    const selectedLocale = writable(initialLocale); 

    const changeLocale = (event: Event) => {
        const selectElement = event.currentTarget as HTMLSelectElement;

        if (!selectElement) {
            return;
        }

        const locale = selectElement.value;
        if (locale) {
            selectedLocale.set(locale);

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
            window.location.href = newPath;
        }
    };
</script>

<select
    class="fixed bg-transparent font-semibold tracking-widest z-30 pointer-events-auto bottom-4 right-4"
    bind:value={$selectedLocale}
    on:change={changeLocale}
>
    <option class="bg-white dark:bg-davys_gray-100" value="fr-ca">Fr</option>
    <option class="bg-white dark:bg-davys_gray-100" value="en-us">En</option>
</select>