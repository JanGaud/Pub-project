<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { Content } from '@prismicio/client';
	import mapStyles from '$lib/utils/mapStyles';
	import { validateForm } from '$lib/utils/formValidator';

	const initialLocale = $page.url.pathname.split('/')[1].slice(0, 2);

	export let slice: Content.ContactSlice;
	let settings = $page.data.settings;
	let location = settings.data.location;

	let isVisible = false;

	// Form data, errors, and success states
	let formData = {
		name: '',
		email: '',
		phone: '', // Add phone number field
		subject: '',
		message: '',
		appointmentDate: '',
		appointmentTime: ''
	};
	let errors: Record<string, string> = {};
	let success: Record<string, boolean> = {};

	// State to track whether support option is selected
	let isSupportSelected = false;

	// Minimum values for date and time pickers
	let minDate: string = '';
	let minTime: string = '';

	// Function to handle form submission
	const handleSubmit = (event: Event) => {
		event.preventDefault(); // Prevent default form submission
		const validation = validateForm(formData, isSupportSelected); // Validate the entire form before submission
		errors = validation.errors;
		success = validation.success;

		// If no errors, submit the form
		if (Object.keys(errors).length === 0) {
			console.log('Form submitted successfully', formData);
			// You can add code here to submit the form data to a server or perform other actions
		} else {
			console.error('Form has validation errors:', errors);
		}
	};

	// Function to handle input changes and validate fields on keyup
	const handleInputChange = (field: keyof typeof formData, value: string) => {
		formData[field] = value;

		// Validate field as the user types
		const { errors: newErrors, success: newSuccess } = validateForm(formData, isSupportSelected);

		// Update errors and success states
		errors = newErrors;
		success = newSuccess;

		// If the subject is changed, check if 'reservation' is selected
		if (field === 'subject') {
			isSupportSelected = value === 'reservation';
		}

		// If appointmentDate changes, update minTime only if the date is today
		if (field === 'appointmentDate') {
			updateMinTime();
		}
	};

	// Function to get the current date and time in the format required for input elements
	function getCurrentDateAndTime() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		minDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
		minTime = `${hours}:${minutes}`; // Format: HH:MM
	}

	// Function to update minTime based on the selected date
	function updateMinTime() {
		const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
		if (formData.appointmentDate === today) {
			getCurrentDateAndTime();
		} else {
			minTime = '00:00'; // If it's not today, reset minTime to midnight
		}
	}

	// Function to check if the section is in view
	function handleScroll() {
		const section = document.querySelector('.form-section');
		if (section) {
			const sectionRect = section.getBoundingClientRect();
			if (sectionRect.top < window.innerHeight && sectionRect.bottom >= 0) {
				isVisible = true;
			} else {
				isVisible = false;
			}
		}
	}

	// Initialize Google Maps
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

	// Load Google Maps script
	function loadGoogleMapsScript(callback: () => void) {
		if (!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${settings.data.google_maps_api_key}&language=${initialLocale}`;
			script.async = true;
			script.defer = true;
			script.onload = callback;
			document.head.appendChild(script);
		} else {
			callback();
		}
	}

	// Mounting the Google Maps and scroll listener
	onMount(() => {
		// Initialize Google Maps
		loadGoogleMapsScript(() => {
			initMap();
		});

		// Get current date and time for min values
		getCurrentDateAndTime();

		// Add scroll event listener for sliding in the form
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section
	use:animateOnScroll
	id={slice.primary.section_id}
	class="form-section"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="h-fit grid grid-cols-1 lg:grid-cols-2 gap-10 mb-4 lg:-mb-20 overflow-x-hidden">
		<div>
			<div class="mb-8 w-full md:w-full">
				<h2 class="text-4xl font-bold tracking-wide mb-2 uppercase">{slice.primary.title}</h2>
				<p>{slice.primary.disclaimer}</p>
			</div>
			<div class="flex flex-col gap-6">
				<!-- Phone -->
				{#if slice.primary.phone_input[0]?.icon !== 'null'}
					<div class="flex items-center gap-2 mb-4 text-xl">
						<Icon
							class="text-gold-second w-12 h-12"
							icon={slice.primary.phone_input[0]?.icon ?? ''}
						/>
						<a href={`tel:${settings.data.phone ?? ''}`} class="text-blue">{settings.data.phone}</a>
					</div>
				{/if}
				<!-- Email -->
				{#if slice.primary.email_input[0]?.icon !== 'null'}
					<div class="flex items-center gap-2 mb-4 text-xl">
						<Icon
							class="text-gold-second w-12 h-12"
							icon={slice.primary.email_input[0]?.icon ?? ''}
						/>
						<a href={`mailto:${settings.data.email ?? ''}`} class="text-blue"
							>{settings.data.email}</a
						>
					</div>
				{/if}
				<!-- Address -->
				{#if slice.primary.adresse_input[0]?.icon !== 'null'}
					<div class="flex items-center gap-2 mb-4 text-xl">
						<Icon class="text-gold-second w-12 h-12" icon={slice.primary.adresse_input[0]?.icon} />
						<p>{settings.data.address}</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Form Container with sliding animation -->
		<div
			class="card bg-[#ffffffad] backdrop-blur-md z-30 border-2 border-gold-second border-opacity-30 shadow-md rounded-3xl flex flex-col justify-center items-center p-6 {isVisible
				? 'slide-in visible'
				: 'slide-in'}"
		>
			<form action="" class="w-full max-w-lg" on:submit={handleSubmit} novalidate>
				<div class="grid grid-cols-1 gap-4">
					<!-- Name input -->
					<div class="relative py-2">
						<input
							type="text"
							placeholder={slice.primary.form_inputs[0]?.name}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
							bind:value={formData.name}
							on:keyup={(e) => handleInputChange('name', e.target.value)}
						/>
						{#if errors.name}
							<span class="absolute top-0 right-0 text-red-500">{errors.name}</span>
						{/if}
						{#if success.name}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Email input -->
					<div class="relative py-2">
						<input
							type="text"
							placeholder={slice.primary.form_inputs[0]?.email}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
							bind:value={formData.email}
							on:keyup={(e) => handleInputChange('email', e.target.value)}
						/>
						{#if errors.email}
							<span class="absolute top-0 right-0 text-red-500">{errors.email}</span>
						{/if}
						{#if success.email}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Phone number input -->
					<div class="relative py-2">
						<input
							type="tel"
							placeholder={slice.primary.form_inputs[0]?.phone ?? 'Phone Number'}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
							bind:value={formData.phone}
							on:keyup={(e) => handleInputChange('phone', e.target.value)}
						/>
						{#if errors.phone}
							<span class="absolute top-0 right-0 text-red-500">{errors.phone}</span>
						{/if}
						{#if success.phone}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Subject dropdown -->
					<div class="relative py-2">
						<select
							placeholder={slice.primary.form_inputs[0]?.subject}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
							bind:value={formData.subject}
							on:change={(e) => handleInputChange('subject', e.target.value)}
						>
							<option value="" disabled selected>{slice.primary.form_inputs[0]?.subject}</option>
							<option value="reservation">{slice.primary.form_inputs[0]?.subject_option_1}</option>
							<option value="other">{slice.primary.form_inputs[0]?.subject_option_2}</option>
						</select>
						{#if errors.subject}
							<span class="absolute top-0 right-0 text-red-500">{errors.subject}</span>
						{/if}
						{#if success.subject}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Date and Time inputs (only if reservation is selected) -->
					{#if isSupportSelected}
						<div class="grid grid-cols-2 gap-4">
							<div class="relative py-2">
								<input
									type="date"
									placeholder="Select Date"
									min={minDate}
									class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
									bind:value={formData.appointmentDate}
									on:change={(e) => handleInputChange('appointmentDate', e.target.value)}
								/>
								{#if errors.appointmentDate}
									<span class="absolute top-0 right-0 text-red-500">{errors.appointmentDate}</span>
								{/if}
								{#if success.appointmentDate}
									<span class="absolute top-0 right-0 text-green-500">✓</span>
									<!-- Green check mark -->
								{/if}
							</div>
							<div class="relative py-2">
								<input
									type="time"
									placeholder="Select Time"
									min={minTime}
									class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
									bind:value={formData.appointmentTime}
									on:change={(e) => handleInputChange('appointmentTime', e.target.value)}
								/>
								{#if errors.appointmentTime}
									<span class="absolute top-0 right-0 text-red-500">{errors.appointmentTime}</span>
								{/if}
								{#if success.appointmentTime}
									<span class="absolute top-0 right-0 text-green-500">✓</span>
									<!-- Green check mark -->
								{/if}
							</div>
						</div>
					{/if}

					<!-- Message textarea -->
					<div class="relative py-2">
						<textarea
							placeholder={slice.primary.form_inputs[0]?.message}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold h-32 resize-none"
							bind:value={formData.message}
							on:keyup={(e) => handleInputChange('message', e.target.value)}
						></textarea>
						{#if errors.message}
							<span class="absolute top-0 right-0 text-red-500">{errors.message}</span>
						{/if}
						{#if success.message}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Submit button -->
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

<style>
	/* Define the initial state and animation for the sliding effect */
	.slide-in {
		transform: translateX(100%);
		opacity: 0;
		transition:
			transform 0.9s ease-in-out,
			opacity 0.9s ease-in-out;
	}

	.slide-in.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.text-green-500 {
		color: #48bb78; /* TailwindCSS green */
	}

	.text-red-500 {
		color: #f56565; /* TailwindCSS red */
	}
</style>
