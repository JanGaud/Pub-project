import { writable } from 'svelte/store';

// Function to get the initial locale based on the URL
const getInitialLocale = () => {
    if (typeof window !== 'undefined') {
        return window.location.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';
    }
    return 'fr-ca'; // Default to French if not in the browser
};

// Create a writable store to track the selected language
export const selectedLocale = writable(getInitialLocale());

// Function to update the URL based on the selected language
export const changeLocale = (locale: string) => {
    selectedLocale.set(locale); // Update the store
    let currentPath = window.location.pathname;
    let newPath = '';

    // If switching to English, ensure /en-us is present in the URL
    if (locale === 'en-us') {
        if (!currentPath.startsWith('/en-us')) {
            newPath = `/en-us${currentPath}`;
        } else {
            newPath = currentPath;
        }
    } else if (locale === 'fr-ca') {
        // If switching to French, remove /en-us from the URL
        if (currentPath.startsWith('/en-us')) {
            newPath = currentPath.replace('/en-us', '');
        } else {
            newPath = currentPath;
        }
        newPath = newPath === '' ? '/' : newPath; // Ensure the root path if necessary
    }

    // Clean up any double slashes in the URL
    newPath = newPath.replace('//', '/');

    // Redirect to the new URL if it's different from the current one
    if (window.location.pathname !== newPath) {
        window.location.href = newPath;
    }
};
