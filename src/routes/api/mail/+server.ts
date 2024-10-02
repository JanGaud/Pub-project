import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

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

        // Path to your local image file
        const logoPath = path.join(process.cwd(), 'static/circleLogo.png');

        // Reservation Template with Inline Styles and CID Reference for Image
        const reservationTemplate = `
            <div style="background-color: #F9F9F9; display: flex; justify-content: center; align-items: center;">
                <div style="font-family: 'DM Sans', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); border: 1px solid #e0e0e0; border-radius: 10px; border-top: 8px solid #DCBD5B;">
                    <h1 style="text-align: center; font-size: 32px; margin: 0; margin-bottom: 20px; padding: 30px;">Nouvelle demande de réservation</h1>
                    <div style="padding: 20px;">
                        <p style="font-size: 16px;"><strong>Nom:</strong> ${formData.name}</p>
                        <p style="font-size: 16px;"><strong>Courriel:</strong> <a href="mailto:${formData.email}" style="color: #1a73e8; text-decoration: none;">${formData.email}</a></p>
                        <p style="font-size: 16px;"><strong>Téléphone:</strong> <a href="tel:${formData.phone}" style="color: #1a73e8; text-decoration: none;">${formData.phone}</a></p>
                        <p style="font-size: 16px;"><strong>Message:</strong> ${formData.message}</p>
                        <br>
                        <h2 style="margin-top: 20px; font-size: 20px; border-bottom: 2px solid #ddd; padding-bottom: 5px;">Détails de la réservation</h2>
                        <p style="font-size: 16px;"><strong>Date du rendez-vous :</strong> ${formData.appointmentDate}</p>
                        <p style="font-size: 16px;"><strong>Heure du rendez-vous :</strong> ${formData.appointmentTime}</p>
                    </div>
                    <footer style="background-color: #DCBD5B; padding: 20px; text-align: center; font-size: 14px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                        <p style="margin: 0;">Envoyé depuis le site web 100 Génies.</p>
                        <img src="cid:logo" alt="100 Génies" style="width: 100px; margin-top: 10px;">
                    </footer>
                </div>
            </div>
        `;

                const generalTemplate = `
            <div style="background-color: #F9F9F9; display: flex; justify-content: center; align-items: center;">
                <div style="font-family: 'DM Sans', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); border: 1px solid #e0e0e0; border-radius: 10px; border-top: 8px solid #DCBD5B;">
                    <h1 style="text-align: center; font-size: 32px; margin: 0; margin-bottom: 20px; padding: 30px;">Nouveau message depuis votre site web</h1>
                    <div style="padding: 20px;">
                        <p style="font-size: 16px;"><strong style="font-size: 24px;>Nom:</strong> ${formData.name}</p>
                        <p style="font-size: 16px;"><strong>Courriel:</strong> <a href="mailto:${formData.email}" style="color: #1a73e8; text-decoration: none;">${formData.email}</a></p>
                        <p style="font-size: 16px;"><strong>Téléphone:</strong> <a href="tel:${formData.phone}" style="color: #1a73e8; text-decoration: none;">${formData.phone}</a></p>
                        <p style="font-size: 16px;"><strong>Sujet:</strong> ${formData.subject}</p>
                        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Message:</strong> ${formData.message}</p>
                    </div>
                    <footer style="background-color: #DCBD5B; padding: 20px; text-align: center; font-size: 14px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                        <p style="margin: 0;">Envoyé depuis le site web 100 Génies.</p>
                        <img src="cid:logo" alt="100 Génies" style="width: 100px; margin-top: 10px;">
                    </footer>
                </div>
            </div>
        `;

        // Select the appropriate template and subject based on the submission type
        const isReservation = formData.subject.toLowerCase() === 'reservation';
        const selectedTemplate = isReservation ? reservationTemplate : generalTemplate;
        const emailSubject = isReservation
            ? `Nouvelle demande de réservation de la part de ${formData.name}`
            : `Nouveau message de la part de ${formData.name}`;

        // Create email options
        const mailOptions = {
            from: formData.email,
            to: process.env.EMAIL_USER,
            subject: emailSubject,
            text: `
                Nom: ${formData.name}
                Courriel: ${formData.email}
                Téléphone: ${formData.phone}
                Sujet: ${formData.subject}
                Message: ${formData.message}
                ${isReservation ? `
                Date: ${formData.appointmentDate}
                Heure: ${formData.appointmentTime}
                ` : ''}
            `,
            html: selectedTemplate,
            attachments: [
                {
                    filename: 'circleLogo.png',
                    path: logoPath,
                    cid: 'logo'
                }
            ]
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        return json({ success: true, message: 'Courriel envoyé avec succès.', info }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return json({ success: false, message: "Échec de l'envoi du courriel", error: errorMessage }, { status: 500 });
    }
}
