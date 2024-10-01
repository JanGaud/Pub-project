// src/lib/utils/validateForm.ts
export function validateForm(formData: { name: string; email: string; subject: string; message: string }): Record<string, string> {
  const errors: Record<string, string> = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  // Validate subject
  if (!formData.subject) {
    errors.subject = "Subject is required";
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}
