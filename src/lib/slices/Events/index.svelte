<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	export let slice: any;

	const social = $page.data.settings.data.social_media || [];
	const initialLocale = $page.url.pathname.split('/')[1].slice(0, 2);

	// Function to handle adding/removing 'visible' class to cards with IntersectionObserver
	const handleCardIntersection = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Generate a random delay between 0 and 500ms
				const randomDelay = Math.random() * 0.5; // 0 to 0.5 seconds delay

				// Add 'visible' class to animate the card when it comes into view
				entry.target.classList.add('visible');
				(entry.target as HTMLElement).style.transitionDelay = `${randomDelay}s`;

				// Apply styles directly to make sure they take effect
				(entry.target as HTMLElement).style.opacity = '1';
				(entry.target as HTMLElement).style.transform = 'translateY(0)';
			} else {
				// Optionally, remove 'visible' class when the card is out of view
				entry.target.classList.remove('visible');

				// Reset styles when out of view
				(entry.target as HTMLElement).style.transitionDelay = '0s';
				(entry.target as HTMLElement).style.opacity = '0';
				(entry.target as HTMLElement).style.transform = 'translateY(20px)';
			}
		});
	};

	onMount(() => {
		// Setup IntersectionObserver for each card
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.2 // 20% visibility threshold to trigger the animation
		};
		const observer = new IntersectionObserver(handleCardIntersection, observerOptions);
		const cards = document.querySelectorAll('.animated-card');
		cards.forEach((card) => {
			observer.observe(card);
		});
	});
</script>

<section
	class="section-to-observe mb-20 md:mb-32 grid"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="flex justify-center text-left lg:w-1/2">
		<h2 class="text-4xl lg:text-6xl text-background mb-6 font-bold tracking-wide uppercase">
			{slice.primary.title}
		</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full py-10">
		<div
			class="animated-card flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl shadow-md py-8"
		>
			<h3 class="text-4xl">{slice.primary.google}</h3>
			<a
				class="shadow-inner h-fit aspect-square rounded-full overflow-hidden border-4 border-gold"
				target="_blank"
				href={`https://calendar.google.com/calendar/u/0/embed?src=c_53ae943b843333bab36d9e11a63a0f18d3770bcd4a4a9e8fc63765ecc7a94d29@group.calendar.google.com&ctz=America/Toronto&pli=1&hl=${initialLocale}`}
			>
				<Icon class="w-36 h-36" icon="logos:google-calendar" />
			</a>
			<p class="px-4 text-center text-sm">
				{slice.primary.google_text}
			</p>
		</div>
		<div
			class="animated-card flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl shadow-md py-8"
		>
			<h3 class="text-4xl">{slice.primary.instagram}</h3>
			<a
				class="shadow-inner h-fit aspect-square rounded-full overflow-hidden border-4 border-gold"
				target="_blank"
				href={social[1]?.link?.url || '#'}
			>
				<Icon class="w-36 h-36" icon="skill-icons:instagram" />
			</a>
			<p class="px-4 text-center text-sm">
				{slice.primary.instagram_texte}
			</p>
		</div>
		<div
			class="animated-card flex flex-col items-center gap-10 border-2 border-gold-second border-opacity-30 rounded-3xl shadow-md py-8"
		>
			<h3 class="text-4xl">{slice.primary.facebook}</h3>
			<a
				class="shadow-inner h-fit aspect-square rounded-full overflow-hidden border-4 border-gold"
				target="_blank"
				href={social[0]?.link?.url || '#'}
			>
				<Icon class="w-36 h-36" icon="logos:facebook" />
			</a>
			<p class="px-4 text-center text-sm">
				{slice.primary.facebook_texte}
			</p>
		</div>
	</div>
</section>