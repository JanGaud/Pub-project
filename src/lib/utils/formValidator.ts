// src/lib/utils/validateForm.ts
export function validateForm(
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    appointmentDate?: string;
    appointmentTime?: string;
  },
  isReservationSelected: boolean
): Record<string, string> {
  const errors: Record<string, string> = {};

  // Validate name (must be at least 3 letters)
  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 letters long.";
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = "Invalid email format.";
  }

  // Validate subject
  if (!formData.subject) {
    errors.subject = "Subject is required.";
  }

  // Validate message (must be a minimum of 10 words)
  const wordCount = formData.message.trim().split(/\s+/).length;
  if (!formData.message.trim()) {
    errors.message = "Message is required.";
  } else if (wordCount < 10) {
    errors.message = "Message must contain at least 10 words.";
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
    }

    // Validate appointmentTime
    if (!formData.appointmentTime?.trim()) {
      errors.appointmentTime = "Time is required.";
    } else if (formData.appointmentDate === today && formData.appointmentTime < now) {
      errors.appointmentTime = "Time cannot be in the past.";
    }
  }

  return errors;
}
