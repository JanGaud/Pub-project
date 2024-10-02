import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
    try {
        const formData = await request.json();

        // Create the nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Create email options based on the form data
        const mailOptions = {
            from: formData.email,
            to: process.env.EMAIL_USER,
            subject: `New ${formData.subject} Submission from ${formData.name}`,
            text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Subject: ${formData.subject}
        Message: ${formData.message}
        Appointment Date: ${formData.appointmentDate}
        Appointment Time: ${formData.appointmentTime}
      `,
            html: `
        <h1>New ${formData.subject} Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        ${formData.subject === 'reservation' ? `
        <p><strong>Appointment Date:</strong> ${formData.appointmentDate}</p>
        <p><strong>Appointment Time:</strong> ${formData.appointmentTime}</p>
        ` : ''}
      `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        return json({ success: true, message: 'Email sent successfully', info }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return json({ success: false, message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
