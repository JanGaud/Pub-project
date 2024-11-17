<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { Content } from '@prismicio/client';
	import { validateForm } from '$lib/utils/formValidator';
	import mapStyles from '$lib/utils/mapStyles';

	const initialLocale = $page.url.pathname.split('/')[1].slice(0, 2);

	export let slice: Content.ContactSlice;
	let settings = $page.data.settings;
	let location = settings.data.location;

	let isVisible = false;
	let submissionMessage = ''; // For displaying success or error messages
	let isSubmitting = false; // Loading state
	let errorTimeoutId: ReturnType<typeof setTimeout>; // Timeout ID to track error message timer

	// Form data, errors, and success states
	let formData = {
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		appointmentDate: '',
		appointmentTime: '',
		reservationType: '', // New field for reservation type
		numberOfPeople: ''    // New field for number of people
	};
	let errors: Record<string, string> = {};
	let success: Record<string, boolean> = {};

	// State to track whether reservation option is selected
	let isReservationSelected = false;

	// Minimum values for date and time pickers
	let minDate: string = '';
	let minTime: string = '';

	// Function to handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault(); // Prevent default form submission
		const validation = validateForm(formData, isReservationSelected); // Validate the entire form before submission
		errors = validation.errors;
		success = validation.success;

		// If no errors, submit the form
		if (Object.keys(errors).length === 0) {
			isSubmitting = true; // Set loading state

			try {
				// Send the form data to the server endpoint
				const response = await fetch('/api/mail', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});

				// Parse the JSON response
				const result = await response.json();

				if (response.ok && result.success) {
					submissionMessage = slice.primary.form_sent[0]?.success ?? '';
					resetMessage(); // Call the function to reset the message

					// Optionally, reset the form data after successful submission
					formData = {
						name: '',
						email: '',
						phone: '',
						subject: '',
						message: '',
						appointmentDate: '',
						appointmentTime: '',
						reservationType: '', // Reset new field
						numberOfPeople: ''    // Reset new field
					};
					success = {}; // Reset success state
				} else {
					submissionMessage = `Err: ${result.message}`;
					resetMessage(); // Call the function to reset the message
				}
			} catch (error) {
				console.error('Error submitting form:', error);
				submissionMessage = slice.primary.form_sent[0]?.try_again ?? '';
				resetMessage();
			} finally {
				isSubmitting = false; // Reset loading state
			}
		} else {
			submissionMessage = slice.primary.form_sent[0]?.error ?? '';
			console.error('Form has validation errors:', errors);
			resetMessage(); // Call the function to reset the message
			resetErrors(); // Call the function to reset errors
		}
	};

	// Function to reset the submission message after 5 seconds
	const resetMessage = () => {
		setTimeout(() => {
			submissionMessage = '';
		}, 5000);
	};

	// Function to reset error messages after 5 seconds if nothing changes
	const resetErrors = () => {
		if (errorTimeoutId) {
			clearTimeout(errorTimeoutId); // Clear the existing timeout to reset it
		}

		// Set a new timeout to clear error messages after 5 seconds
		errorTimeoutId = setTimeout(() => {
			errors = {}; // Clear all error messages
		}, 5000);
	};

	// Function to handle input changes and validate fields on keyup
	const handleInputChange = (field: keyof typeof formData, value: string) => {
		formData[field] = value;

		// Validate field as the user types
		const { errors: newErrors, success: newSuccess } = validateForm(
			formData,
			isReservationSelected
		);

		// Update errors and success states
		errors = newErrors;
		success = newSuccess;

		// Reset errors after 5 seconds if they are not changing
		resetErrors();

		// If the subject is changed, check if 'reservation' is selected
		if (field === 'subject') {
			isReservationSelected = value.toLowerCase() === 'reservation';
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
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		minDate = `${year}-${month}-${day}`;
		minTime = `${hours}:${minutes}`;
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
			styles: mapStyles,
		};

		if (typeof google !== 'undefined') {
			const map = new google.maps.Map(
				document.getElementById('map') as HTMLElement,
				mapOptions
			);

			// Add a marker at the specified location
			new google.maps.Marker({
				position: { lat: location.latitude, lng: location.longitude },
				map: map,
				title: 'Location',
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
						<Icon class="text-gold-second w-12 h-12" icon={slice.primary.adresse_input[0]?.icon ?? ''} />
						<p>{settings.data.address}</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Form Container with sliding animation -->
		<div
			class="card bg-[#ffffffad] max-w-lg backdrop-blur-md z-30 border-2 border-gold-second border-opacity-30 shadow-md rounded-3xl flex flex-col justify-center items-center p-6 {isVisible
				? 'slide-in visible'
				: 'slide-in'}"
		>
			<form action="" class="w-full" on:submit={handleSubmit} novalidate>
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
							<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.name}</span>
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
							<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.email}</span>
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
							<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.phone}</span>
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
							<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.subject}</span>
						{/if}
						{#if success.subject}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Date and Time inputs (only if reservation is selected) -->
					{#if isReservationSelected}
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
									<span class="absolute top-0 right-0 text-red-500 cursor-none"
										>{errors.appointmentDate}</span
									>
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
									<span class="absolute top-0 right-0 text-red-500 cursor-none"
										>{errors.appointmentTime}</span
									>
								{/if}
								{#if success.appointmentTime}
									<span class="absolute top-0 right-0 text-green-500">✓</span>
								{/if}
							</div>
						</div>

						<!-- New fields for Reservation Type and Number of People -->
						<div class="grid grid-cols-2 gap-4">
							<!-- Reservation Type Dropdown -->
							<div class="relative py-2">
								<select
									placeholder="Select Reservation Type"
									class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
									bind:value={formData.reservationType}
									on:change={(e) => handleInputChange('reservationType', e.target.value)}
								>
									<option value="" disabled selected>{slice.primary.form_inputs[0]?.reservationtype}</option>
									<option value="table">{slice.primary.form_inputs[0]?.reservationtype_option_1}</option>
									<option value="vip">{slice.primary.form_inputs[0]?.reservationtype_option_2}</option>
								</select>
								{#if errors.reservationType}
									<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.reservationType}</span>
								{/if}
								{#if success.reservationType}
									<span class="absolute top-0 right-0 text-green-500">✓</span>
								{/if}
							</div>

							<!-- Number of People Input -->
							<div class="relative py-2">
								<input
									type="number"
									placeholder={slice.primary.form_inputs[0]?.nbperson}
									min="1"
									class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold"
									bind:value={formData.numberOfPeople}
									on:keyup={(e) => handleInputChange('numberOfPeople', e.target.value)}
								/>
								{#if errors.numberOfPeople}
									<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.numberOfPeople}</span>
								{/if}
								{#if success.numberOfPeople}
									<span class="absolute top-0 right-0 text-green-500">✓</span>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Message textarea -->
					<div class="relative py-2">
						<textarea
							data-gramm="false"
							placeholder={slice.primary.form_inputs[0]?.message}
							class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold h-32 resize-none"
							bind:value={formData.message}
							on:keyup={(e) => handleInputChange('message', e.target.value)}
						></textarea>
						{#if errors.message}
							<span class="absolute top-0 right-0 text-red-500 cursor-none">{errors.message}</span>
						{/if}
						{#if success.message}
							<span class="absolute top-0 right-0 text-green-500">✓</span> <!-- Green check mark -->
						{/if}
					</div>

					<!-- Submit button -->
					<button
						type="submit"
						class="mt-6 shadow-xl flex items-center justify-center gap-4 w-full border-4 uppercase bg-background text-white backdrop-blur border-gold-second hover:border-gold active:border-gold duration-200 p-4"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<!-- Loading spinner -->
							<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
							</svg>
							{slice.primary.form_sent[0]?.button}
						{:else}
							{slice.primary.form_inputs[0]?.send_button ?? 'Envoyer'}
						{/if}
					</button>
					<div class="h-4 flex items-center justify-center">
						<!-- Submission message display -->
						{#if submissionMessage}
							<p class="text-sm text-center">{submissionMessage}</p>
						{/if}
					</div>
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
</style>
