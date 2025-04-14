import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import type { RequestEvent } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

dotenv.config();

/* ------------------------------------------------------------------ */
/*  Runtime‑constants (one‑time work)                                  */
/* ------------------------------------------------------------------ */

const {
    EMAIL_USER,
    EMAIL_PASS,
    CC_EMAIL_MIA,
    CC_EMAIL_DOM,
    LOGO_URL = 'https://www.pub100genies.ca/circleLogo.png'
} = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

const ccList: string[] = [CC_EMAIL_MIA, CC_EMAIL_DOM].filter(
    (v): v is string => Boolean(v)
);

const baseAttachments = [
    { filename: '100Genies.png', path: LOGO_URL, cid: 'logo@100genies' }
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

interface FormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    appointmentDate?: string;
    appointmentTime?: string;
    reservationType?: string;
    numberOfPeople?: string;
}

// Minimal, dependency‑free validation
function isFormData(obj: any): obj is FormData {
    return (
        obj &&
        typeof obj.name === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.subject === 'string' &&
        typeof obj.message === 'string'
    );
}

function buildHtml(data: FormData, opts: { confirmation?: boolean }) {
    const isReservation = data.subject.toLowerCase() === 'reservation';

    const heading = opts.confirmation
        ? `Merci pour votre message, ${data.name}&nbsp;!`
        : isReservation
            ? 'Nouvelle demande de réservation'
            : 'Nouveau message depuis votre site web';

    const details =
        isReservation && !opts.confirmation
            ? `
      <h2 style="margin-top:20px;font-size:20px;border-bottom:2px solid #ddd;padding-bottom:5px;">Détails de la réservation</h2>
      <p><strong>Date&nbsp;:</strong> ${data.appointmentDate}</p>
      <p><strong>Heure&nbsp;:</strong> ${data.appointmentTime}</p>
      <p><strong>Type&nbsp;:</strong> ${data.reservationType}</p>
      <p><strong>Nombre de personnes&nbsp;:</strong> ${data.numberOfPeople}</p>`
            : '';

    const recap = opts.confirmation
        ? `<div style="padding:0 40px;">
        <p style="font-weight:bold;">Récapitulatif&nbsp;:</p>
        <ul>
          <li><strong>Nom&nbsp;:</strong> ${data.name}</li>
          <li><strong>Courriel&nbsp;:</strong> ${data.email}</li>
          <li><strong>Téléphone&nbsp;:</strong> ${data.phone ?? ''}</li>
          <li><strong>Message&nbsp;:</strong> ${data.message}</li>
        </ul>
      </div>`
        : '';

    return `
    <div style="background:#F9F9F9;display:flex;justify-content:center;">
      <div style="font-family:'DM Sans',sans-serif;max-width:600px;background:#fff;border:1px solid #e0e0e0;border-radius:10px;box-shadow:2px 2px 10px rgba(0,0,0,.3);border-top:8px solid #DCBD5B;">
        <h1 style="text-align:center;font-size:32px;padding:30px;">${heading}</h1>
        <div style="padding:20px;">
          <p><strong>Nom&nbsp;:</strong> ${data.name}</p>
          <p><strong>Courriel&nbsp;:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone
            ? `<p><strong>Téléphone&nbsp;:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>`
            : ''
        }
          <p><strong>Message&nbsp;:</strong> ${data.message}</p>
          ${details}
        </div>
        ${recap}
        <footer style="background:#DCBD5B;padding:20px;text-align:center;border-radius:0 0 10px 10px;">
          <p style="margin:0;">Envoyé depuis le site web 100 Génies.</p>
          <img src="cid:logo@100genies" alt="100 Génies" style="width:100px;margin-top:10px;">
        </footer>
      </div>
    </div>`;
}

function buildText(data: FormData, confirmation = false) {
    const base = `
Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone ?? ''}
Sujet: ${data.subject}
Message: ${data.message}`;

    const resPart =
        data.subject.toLowerCase() === 'reservation'
            ? `
Date: ${data.appointmentDate}
Heure: ${data.appointmentTime}
Type: ${data.reservationType}
Nombre de personnes: ${data.numberOfPeople}`
            : '';

    return confirmation
        ? `Bonjour ${data.name},

Nous avons bien reçu votre message.

${base}${resPart}

Merci !`
        : `${base}${resPart}`;
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST({ request }: RequestEvent) {
    try {
        const raw = await request.json();

        if (!isFormData(raw)) {
            return json({ success: false, message: 'Données invalides.' }, { status: 400 });
        }

        const data: FormData = raw;
        const isReservation = data.subject.toLowerCase() === 'reservation';

        const adminSubject = isReservation
            ? `Nouvelle demande de réservation de ${data.name}`
            : `Nouveau message de ${data.name}`;

        const mailToAdmin = {
            from: EMAIL_USER,
            replyTo: data.email,
            to: EMAIL_USER,
            cc: ccList,
            subject: adminSubject,
            text: buildText(data),
            html: buildHtml(data, { confirmation: false }),
            attachments: baseAttachments
        } as const;

        const mailToUser = {
            from: EMAIL_USER,
            to: data.email,
            subject: `Confirmation de votre ${isReservation ? 'réservation' : 'message'} - 100 Génies`,
            text: buildText(data, true),
            html: buildHtml(data, { confirmation: true }),
            attachments: baseAttachments
        } as const;

        await Promise.all([
            transporter.sendMail(mailToAdmin),
            transporter.sendMail(mailToUser)
        ]);

        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Mail error:', err);
        return json(
            {
                success: false,
                message: "Erreur d'envoi.",
                error: err instanceof Error ? err.message : 'Unknown'
            },
            { status: 500 }
        );
    }
}
gi