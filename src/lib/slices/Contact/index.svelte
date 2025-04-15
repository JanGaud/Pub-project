<script context="module" lang="ts">
	declare const google: any;
</script>

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
	let submissionMessage = '';
	let isSubmitting = false;
	let errorTimeoutId: ReturnType<typeof setTimeout>;

	// Form data, errors, and success states
	let formData = {
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		appointmentDate: '',
		appointmentTime: '',
		reservationType: '',
		numberOfPeople: ''
	};
	let errors: Record<string, string> = {};
	let success: Record<string, boolean> = {};

	let isReservationSelected = false;

	let minDate: string = '';
	let minTime: string = '';

	/** Convenience: safely grab .value from any form element */
	function valueOf(e: Event) {
		return (
			(e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? ''
		);
	}

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const validation = validateForm(formData, isReservationSelected);
		errors = validation.errors;
		success = validation.success;

		if (Object.keys(errors).length === 0) {
			isSubmitting = true;
			try {
				const response = await fetch('/api/mail', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});
				const result = await response.json();

				if (response.ok && result.success) {
					submissionMessage = slice.primary.form_sent[0]?.success ?? '';
					resetMessage();
					formData = {
						name: '',
						email: '',
						phone: '',
						subject: '',
						message: '',
						appointmentDate: '',
						appointmentTime: '',
						reservationType: '',
						numberOfPeople: ''
					};
					success = {};
				} else {
					submissionMessage = `Err: ${result.message}`;
					resetMessage();
				}
			} catch (error) {
				console.error('Error submitting form:', error);
				submissionMessage = slice.primary.form_sent[0]?.try_again ?? '';
				resetMessage();
			} finally {
				isSubmitting = false;
			}
		} else {
			submissionMessage = slice.primary.form_sent[0]?.error ?? '';
			console.error('Form has validation errors:', errors);
			resetMessage();
			resetErrors();
		}
	};

	const resetMessage = () => setTimeout(() => (submissionMessage = ''), 5000);

	const resetErrors = () => {
		if (errorTimeoutId) clearTimeout(errorTimeoutId);
		errorTimeoutId = setTimeout(() => (errors = {}), 5000);
	};

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		formData[field] = value;
		const { errors: newErrors, success: newSuccess } = validateForm(
			formData,
			isReservationSelected
		);
		errors = newErrors;
		success = newSuccess;
		resetErrors();

		if (field === 'subject') {
			isReservationSelected = value.toLowerCase() === 'reservation';
		}

		if (field === 'appointmentDate') updateMinTime();
	};

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

	function updateMinTime() {
		const today = new Date().toISOString().split('T')[0];
		if (formData.appointmentDate === today) {
			getCurrentDateAndTime();
		} else {
			minTime = '00:00';
		}
	}

	function handleScroll() {
		const section = document.querySelector('.form-section');
		if (section) {
			const { top, bottom } = section.getBoundingClientRect();
			isVisible = top < window.innerHeight && bottom >= 0;
		}
	}

	function initMap() {
		const mapOptions = {
			center: { lat: location.latitude, lng: location.longitude },
			zoom: 14,
			styles: mapStyles
		};

		if (typeof google !== 'undefined') {
			const map = new google.maps.Map(
				document.getElementById('map') as HTMLElement,
				mapOptions
			);
			new google.maps.Marker({
				position: { lat: location.latitude, lng: location.longitude },
				map,
				title: 'Location'
			});
		}
	}

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

	onMount(() => {
		loadGoogleMapsScript(initMap);
		getCurrentDateAndTime();
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
						<Icon class="text-gold-second w-12 h-12" icon={slice.primary.phone_input[0]?.icon ?? ''} />
						<a href={`tel:${settings.data.phone ?? ''}`} class="text-blue">{settings.data.phone}</a>
					</div>
				{/if}
				<!-- Email -->
				{#if slice.primary.email_input[0]?.icon !== 'null'}
					<div class="flex items-center gap-2 mb-4 text-xl">
						<Icon class="text-gold-second w-12 h-12" icon={slice.primary.email_input[0]?.icon ?? ''} />
						<a href={`mailto:${settings.data.email ?? ''}`} class="text-blue">{settings.data.email}</a>
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

		<!-- Form Container -->
		<div class="card bg-[#ffffffad] max-w-lg backdrop-blur-md z-30 border-2 border-gold-second border-opacity-30 shadow-md rounded-3xl flex flex-col justify-center items-center p-6 {isVisible ? 'slide-in visible' : 'slide-in'}">
			<form class="w-full" on:submit={handleSubmit} novalidate>
				<div class="grid grid-cols-1 gap-4">
					<!-- Name -->
					<div class="relative py-2">
						<input type="text" placeholder={slice.primary.form_inputs[0]?.name} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.name} on:input={(e) => handleInputChange('name', valueOf(e))} />
						{#if errors.name}<span class="absolute top-0 right-0 text-red-500">{errors.name}</span>{/if}
						{#if success.name}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
					</div>

					<!-- Email -->
					<div class="relative py-2">
						<input type="text" placeholder={slice.primary.form_inputs[0]?.email} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.email} on:input={(e) => handleInputChange('email', valueOf(e))} />
						{#if errors.email}<span class="absolute top-0 right-0 text-red-500">{errors.email}</span>{/if}
						{#if success.email}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
					</div>

					<!-- Phone -->
					<div class="relative py-2">
						<input type="tel" placeholder={slice.primary.form_inputs[0]?.phone ?? 'Phone Number'} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.phone} on:input={(e) => handleInputChange('phone', valueOf(e))} />
						{#if errors.phone}<span class="absolute top-0 right-0 text-red-500">{errors.phone}</span>{/if}
						{#if success.phone}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
					</div>

					<!-- Subject -->
					<div class="relative py-2">
						<select class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.subject} on:change={(e) => handleInputChange('subject', valueOf(e))}>
							<option value="" disabled selected>{slice.primary.form_inputs[0]?.subject}</option>
							<option value="reservation">{slice.primary.form_inputs[0]?.subject_option_1}</option>
							<option value="other">{slice.primary.form_inputs[0]?.subject_option_2}</option>
						</select>
						{#if errors.subject}<span class="absolute top-0 right-0 text-red-500">{errors.subject}</span>{/if}
						{#if success.subject}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
					</div>

					{#if isReservationSelected}
						<!-- Date & Time -->
						<div class="grid grid-cols-2 gap-4">
							<div class="relative py-2">
								<input type="date" min={minDate} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.appointmentDate} on:change={(e) => handleInputChange('appointmentDate', valueOf(e))} />
								{#if errors.appointmentDate}<span class="absolute top-0 right-0 text-red-500">{errors.appointmentDate}</span>{/if}
								{#if success.appointmentDate}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
							</div>
							<div class="relative py-2">
								<input type="time" min={minTime} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.appointmentTime} on:change={(e) => handleInputChange('appointmentTime', valueOf(e))} />
								{#if errors.appointmentTime}<span class="absolute top-0 right-0 text-red-500">{errors.appointmentTime}</span>{/if}
								{#if success.appointmentTime}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
							</div>
						</div>

						<!-- Reservation type & People -->
						<div class="grid grid-cols-2 gap-4">
							<div class="relative py-2">
								<select class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.reservationType} on:change={(e) => handleInputChange('reservationType', valueOf(e))}>
									<option value="" disabled selected>{slice.primary.form_inputs[0]?.reservationtype}</option>
									<option value="table">{slice.primary.form_inputs[0]?.reservationtype_option_1}</option>
									<option value="vip">{slice.primary.form_inputs[0]?.reservationtype_option_2}</option>
								</select>
								{#if errors.reservationType}<span class="absolute top-0 right-0 text-red-500">{errors.reservationType}</span>{/if}
								{#if success.reservationType}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
							</div>
							<div class="relative py-2">
								<input type="number" min="1" placeholder={slice.primary.form_inputs[0]?.nbperson} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold" bind:value={formData.numberOfPeople} on:input={(e) => handleInputChange('numberOfPeople', valueOf(e))} />
								{#if errors.numberOfPeople}<span class="absolute top-0 right-0 text-red-500">{errors.numberOfPeople}</span>{/if}
								{#if success.numberOfPeople}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
							</div>
						</div>
					{/if}

					<!-- Message -->
					<div class="relative py-2">
						<textarea placeholder={slice.primary.form_inputs[0]?.message} class="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:border-gold h-32 resize-none" bind:value={formData.message} on:input={(e) => handleInputChange('message', valueOf(e))}></textarea>
						{#if errors.message}<span class="absolute top-0 right-0 text-red-500">{errors.message}</span>{/if}
						{#if success.message}<span class="absolute top-0 right-0 text-green-500">✓</span>{/if}
					</div>

					<!-- Submit -->
					<button type="submit" class="mt-6 shadow-xl flex items-center justify-center gap-4 w-full border-4 uppercase bg-background text-white backdrop-blur border-gold-second hover:border-gold active:border-gold duration-200 p-4" disabled={isSubmitting}>
						{#if isSubmitting}
							<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
							{slice.primary.form_sent[0]?.button}
						{:else}
							{slice.primary.form_inputs[0]?.send_button ?? 'Envoyer'}
						{/if}
					</button>
					<div class="h-4 flex items-center justify-center">
						{#if submissionMessage}<p class="text-sm text-center">{submissionMessage}</p>{/if}
					</div>
				</div>
			</form>
		</div>
	</div>

	<!-- Map -->
	<div id="map" class="relative -mx-2 md:-mx-20 mb-20 md:mb-32 h-[350px] z-10"></div>
</section>

<style>
	.slide-in {
		transform: translateX(100%);
		opacity: 0;
		transition: transform 0.9s ease-in-out, opacity 0.9s ease-in-out;
	}
	.slide-in.visible {
		transform: translateX(0);
		opacity: 1;
	}
</style>
