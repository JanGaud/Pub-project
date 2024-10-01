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
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long.";
  } else {
    success.name = true;
  }

  // Validate email
  if (formData.email.trim() && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = "Invalid email format.";
  } else if (formData.email.trim()) {
    success.email = true;
  }

  // Validate phone number (only if provided, 10 digits minimum)
  if (formData.phone.trim() && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = "Phone number must be at least 10 digits long.";
  } else if (formData.phone.trim()) {
    success.phone = true;
  }

  // Validate that either phone or email is provided
  if (!formData.email.trim() && !formData.phone.trim()) {
    errors.phone = "Phone number or an email mandatory.";
    errors.email = "Phone number or an email mandatory.";
  }

  // Validate subject
  if (!formData.subject) {
    errors.subject = "Subject is required.";
  } else {
    success.subject = true;
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = "Message is required.";
  } else if (formData.message.split(' ').length < 5) {
    errors.message = "Message must be at least 5 words.";
  } else {
    success.message = true;
  }

  // If the 'reservation' subject is selected, validate appointmentDate and appointmentTime
  if (isReservationSelected) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Get current time in HH:MM format

    // Validate appointmentDate
    if (!formData.appointmentDate?.trim()) {
      errors.appointmentDate = "Date is required.";
    } else if (formData.appointmentDate < today) {
      errors.appointmentDate = "Date cannot be in the past.";
    } else {
      success.appointmentDate = true;
    }

    // Validate appointmentTime
    if (!formData.appointmentTime?.trim()) {
      errors.appointmentTime = "Time is required.";
    } else if (formData.appointmentDate === today && formData.appointmentTime < now) {
      errors.appointmentTime = "Time cannot be in the past.";
    } else {
      success.appointmentTime = true;
    }
  }

  return { errors, success };
}
