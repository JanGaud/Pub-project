<script lang="ts">
	import { onMount } from 'svelte';
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import type { Content } from '@prismicio/client';

	export let slice: Content.ContactSlice;
	let settings = $page.data.settings;
	let location = settings.data.location;

	// Snazzy Maps styles array
	const mapStyles = [
		{
			featureType: 'all',
			elementType: 'labels.text.fill',
			stylers: [{ saturation: 36 }, { color: '#ffffff' }, { lightness: 40 }]
		},
		{
			featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [{ visibility: 'off' }, { color: '#000000' }, { lightness: 16 }]
		},
		{
			featureType: 'all',
			elementType: 'labels.icon',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.fill',
			stylers: [{ color: '#c0c0c0' }, { lightness: 20 }, { visibility: 'on' }]
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }, { visibility: 'off' }]
		},
		{
			featureType: 'landscape',
			elementType: 'geometry',
			stylers: [{ color: '#000000' }, { lightness: 20 }]
		},
		{
			featureType: 'landscape',
			elementType: 'geometry.fill',
			stylers: [{ color: '#3f3f3f' }]
		},
		{
			featureType: 'landscape',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'landscape.man_made',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#333333' },
				{ visibility: 'on' },
				{ saturation: '0' },
				{ lightness: '0' },
				{ gamma: '1.00' }
			]
		},
		{
			featureType: 'landscape.man_made',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'landscape.natural',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#2b2b2b' },
				{ visibility: 'on' },
				{ gamma: '1' },
				{ lightness: '0' },
				{ saturation: '0' }
			]
		},
		{
			featureType: 'landscape.natural',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'landscape.natural.landcover',
			elementType: 'geometry.fill',
			stylers: [{ visibility: 'off' }, { color: '#ff0000' }]
		},
		{
			featureType: 'landscape.natural.landcover',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'landscape.natural.terrain',
			elementType: 'geometry.fill',
			stylers: [{ visibility: 'on' }, { color: '#222222' }]
		},
		{
			featureType: 'landscape.natural.terrain',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [{ color: '#000000' }, { lightness: 21 }]
		},
		{
			featureType: 'poi',
			elementType: 'geometry.fill',
			stylers: [{ color: '#4a4a4a' }, { visibility: 'on' }]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.fill',
			stylers: [{ color: '#ac9455' }, { lightness: '0' }, { gamma: '1.00' }]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [{ color: '#000000' }, { lightness: 29 }, { weight: 0.2 }]
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry',
			stylers: [{ color: '#ac9455' }, { lightness: '0' }]
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry.fill',
			stylers: [{ color: '#ac9455' }]
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'road.local',
			elementType: 'geometry',
			stylers: [{ color: '#000000' }, { lightness: 16 }]
		},
		{
			featureType: 'road.local',
			elementType: 'geometry.fill',
			stylers: [{ color: '#222222' }]
		},
		{
			featureType: 'road.local',
			elementType: 'geometry.stroke',
			stylers: [{ visibility: 'off' }]
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [{ color: '#000000' }, { lightness: 19 }]
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{ color: '#000000' }, { lightness: 17 }]
		},
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [{ color: '#1a1a1a' }]
		}
	];

	function initMap() {
		const mapOptions = {
			center: { lat: location.latitude, lng: location.longitude },
			zoom: 14,
			styles: mapStyles
		};

		if (typeof google !== 'undefined') {
			const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

			// Add a marker at the specified location
			new google.maps.Marker({
				position: { lat: location.latitude, lng: location.longitude },
				map: map,
				title: 'Location'
			});
		}
	}

	function loadGoogleMapsScript(callback: () => void) {
		if (!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${settings.data.google_maps_api_key}&language=en`;
			script.async = true;
			script.defer = true;
			script.onload = callback;
			document.head.appendChild(script);
		} else {
			callback();
		}
	}

	onMount(() => {
		loadGoogleMapsScript(() => {
			initMap();
		});
	});
</script>

<section
	use:animateOnScroll
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="h-fit grid grid-cols-1 lg:grid-cols-2 gap-10 mb-4 lg:-mb-20">
		<div>
			<div class="mb-8 w-full md:w-full">
				<h2 class="text-4xl font-bold tracking-wide mb-2">{slice.primary.title}</h2>
				<p>{slice.primary.disclaimer}</p>
			</div>
			<div>
				<!-- Phone -->
				{#if slice.primary.phone_input[0]?.icon !== 'null'}
					<div class="flex items-end gap-2 mb-4">
						<Icon class="text-gold-second w-8 h-8" icon={slice.primary.phone_input[0]?.icon} />
						<a href={`tel:${settings.data.phone ?? ''}`} class="text-blue">{settings.data.phone}</a>
					</div>
				{/if}
				<!-- Email -->
				{#if slice.primary.email_input[0]?.icon !== 'null'}
					<div class="flex items-end gap-2 mb-4">
						<Icon class="text-gold-second w-8 h-8" icon={slice.primary.email_input[0]?.icon} />
						<a href={`mailto:${settings.data.email ?? ''}`} class="text-blue"
							>{settings.data.email}</a
						>
					</div>
				{/if}
				<!-- Address -->
				{#if slice.primary.adresse_input[0]?.icon !== 'null'}
					<div class="flex items-end gap-2 mb-4">
						<Icon class="text-gold-second w-8 h-8" icon={slice.primary.adresse_input[0]?.icon} />
						<p>{settings.data.address}</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Form Container with higher z-index -->
		<div
			class="card bg-[#ffffffad] backdrop-blur-md z-30 border-2 border-gold-second lg:border-opacity-30 shadow-md rounded-3xl flex flex-col justify-center items-center p-6"
		>
			<form action="" class="w-full max-w-lg">
				<div class="grid grid-cols-1 gap-4">
					<input
						type="text"
						placeholder={slice.primary.form_inputs[0]?.name}
						class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
					/>
					<input
						type="email"
						placeholder={slice.primary.form_inputs[0]?.email}
						class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
					/>
					<input
						type="text"
						placeholder={slice.primary.form_inputs[0]?.subject}
						class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
					/>
					<textarea
						placeholder={slice.primary.form_inputs[0]?.message}
						class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold h-32 resize-none"
					></textarea>
					<button
						type="submit"
						class="mt-6 shadow-xl flex items-center justify-center gap-4 w-full border-4 uppercase bg-background text-white backdrop-blur border-gold-second hover:border-gold duration-200 p-4"
					>
						{slice.primary.form_inputs[0]?.send_button}
					</button>
				</div>
			</form>
		</div>
	</div>

	<!-- Google Map Container -->
	<div id="map" class="relative -mx-2 md:-mx-20 mb-20 md:mb-32 h-[350px] z-10"></div>
</section>
