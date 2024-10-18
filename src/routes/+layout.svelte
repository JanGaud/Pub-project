<script>
	// @ts-nocheck
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { blur } from 'svelte/transition';

	export let data;

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });

	const businessInfo = $page.data.settings.data;
</script>

<svelte:head>
  {#if $page.status !== 404 && $page.status !== 500}
    <title>{$page.data.title}</title>
    {#if $page.data.meta_description}
      <meta name="description" content={$page.data.meta_description} />
    {/if}
    {#if $page.data.meta_title}
      <meta name="og:title" content={$page.data.meta_title} />
    {/if}
    {#if $page.data.meta_image}
      <meta name="og:image" content={$page.data.meta_image.url} />
      <meta name="twitter:card" content="summary_large_image" />
    {/if}
  {/if}
</svelte:head>

<Navbar />
{#key data.url}
	<main
		transition:blur={{ amount: 20 }}
		class="mx-auto mt-36 px-2 md:px-20 max-w-screen-2xl"
	>
		<slot />
	</main>
{/key}
<Footer />

<PrismicPreview {repositoryName} />

{@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${businessInfo.addresslocality}",
    "addressRegion": "${businessInfo.adressregion}",
    "postalCode": "${businessInfo.postalcode}",
    "streetAddress": "${businessInfo.streetadress}"
  },
  "name": "${businessInfo.business_name}",
  "openingHours": [
    "${businessInfo.opening_hours[0].dayshours}",
    "${businessInfo.opening_hours[1].dayshours}",
    "${businessInfo.opening_hours[2].dayshours}"
  ],
  "priceRange": "$",
  "servesCuisine": [
    "${businessInfo.food_type}"
  ],
  "telephone": "${businessInfo.phone}",
  "url": "${businessInfo.website}"
}
</script>
`}
