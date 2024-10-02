import { createClient } from '$lib/prismicio';

let formErrors: Record<string, any> = {};

// Load the dynamic error messages based on the language only on the client-side
if (typeof window !== 'undefined') {
  const client = createClient();

  // Get the language based on the window's path only when in a browser environment
  const lang = window.location.pathname.startsWith('/en-us') ? 'en-us' : 'fr-ca';

  // Fetch the dynamic form error messages based on the language
  client.getAllByType('formerrors', { lang }).then((response) => {
    formErrors = response.length > 0 ? response[0].data : {};
  });
}

// Utility function to get dynamic error message
const getErrorMessage = (field: string, type: string): string => {
  return formErrors[field]?.[0]?.[type] || 'Invalid input';
};

export function validateForm(
  formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    appointmentDate?: string;
    appointmentTime?: string;
  },
  isReservationSelected: boolean
): { errors: Record<string, string>; success: Record<string, boolean> } {
  const errors: Record<string, string> = {};
  const success: Record<string, boolean> = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = getErrorMessage('name', 'required');
  } else if (formData.name.trim().length < 3) {
    errors.name = getErrorMessage('name', 'minimum');
  } else {
    success.name = true;
  }

  // Validate email (mandatory)
  if (!formData.email.trim()) {
    errors.email = getErrorMessage('email', 'required');
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = getErrorMessage('email', 'invalid');
  } else {
    success.email = true;
  }

  // Validate phone number (optional, but if provided, it should have 10 digits)
  if (formData.phone.trim() && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = getErrorMessage('phone', 'minimum');
  } else if (formData.phone.trim()) {
    success.phone = true;
  }

  // Validate subject
  if (!formData.subject) {
    errors.subject = getErrorMessage('subject', 'required');
  } else {
    success.subject = true;
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = getErrorMessage('message', 'required');
  } else if (formData.message.split(' ').length < 5) {
    errors.message = getErrorMessage('message', 'minimum');
  } else {
    success.message = true;
  }

  // If the 'reservation' subject is selected, validate appointmentDate and appointmentTime
  if (isReservationSelected) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Get current time in HH:MM format

    // Validate appointmentDate
    if (!formData.appointmentDate?.trim()) {
      errors.appointmentDate = getErrorMessage('date', 'required_date');
    } else if (formData.appointmentDate < today) {
      errors.appointmentDate = getErrorMessage('date', 'invalid_date'); // Use a dynamic message if available
    } else {
      success.appointmentDate = true;
    }

    // Validate appointmentTime
    if (!formData.appointmentTime?.trim()) {
      errors.appointmentTime = getErrorMessage('date', 'required_time');
    } else if (formData.appointmentDate === today && formData.appointmentTime < now) {
      errors.appointmentTime = getErrorMessage('date', 'invalid_time'); // Use a dynamic message if available
    } else {
      success.appointmentTime = true;
    }
  }

  return { errors, success };
}
