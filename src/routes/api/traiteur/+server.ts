import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

/*
 * Traiteurs 100 Limites — catering request form (/traiteur).
 * Sends each request to the events inbox, with Reply-To set to the client.
 * Uses the same Gmail account as /api/mail (EMAIL_USER / EMAIL_PASS env vars).
 */

const RECIPIENT = env.TRAITEUR_EMAIL || 'evenements100genies@gmail.com';

const escape = (v: unknown) =>
	String(v ?? '')
		.trim()
		.slice(0, 5000)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST({ request }: RequestEvent) {
	let raw: Record<string, unknown>;
	try {
		raw = await request.json();
	} catch {
		return json({ success: false }, { status: 400 });
	}

	// Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
	if (raw.website) return json({ success: true });

	const name = String(raw.name ?? '').trim();
	const email = String(raw.email ?? '').trim();
	const message = String(raw.message ?? '').trim();
	if (!name || !message || !isEmail(email)) {
		return json({ success: false, message: 'Données invalides.' }, { status: 400 });
	}

	if (!env.EMAIL_USER || !env.EMAIL_PASS) {
		console.error('Traiteur mail: EMAIL_USER / EMAIL_PASS are not set');
		return json({ success: false }, { status: 500 });
	}

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS }
	});

	const rows: [string, string][] = [
		['Nom', escape(name)],
		['Courriel', `<a href="mailto:${escape(email)}">${escape(email)}</a>`],
		['Téléphone', escape(raw.phone) || '—'],
		["Date de l'événement", escape(raw.date) || '—'],
		["Nombre d'invités", escape(raw.guests) || '—'],
		['Message', escape(message).replace(/\n/g, '<br>')]
	];

	const html = `
	<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-top:6px solid #d9a44c;border-radius:8px;">
		<h1 style="font-size:22px;padding:24px 24px 0;margin:0;">Nouvelle demande traiteur</h1>
		<p style="padding:4px 24px 0;margin:0;color:#777;">Traiteurs 100 Limites : formulaire du site web</p>
		<table style="padding:16px 24px 24px;font-size:15px;line-height:1.6;">
			${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;vertical-align:top;font-weight:bold;white-space:nowrap;">${k}</td><td style="padding:4px 0;">${v}</td></tr>`).join('')}
		</table>
	</div>`;

	const text = rows.map(([k]) => k).map((k, i) => `${k}: ${[name, email, String(raw.phone ?? ''), String(raw.date ?? ''), String(raw.guests ?? ''), message][i]}`).join('\n');

	const details = [raw.date && `le ${String(raw.date).trim()}`, raw.guests && `${String(raw.guests).trim()} invités`]
		.filter(Boolean)
		.join(', ');

	try {
		await transporter.sendMail({
			from: `"Site 100 Génies" <${env.EMAIL_USER}>`,
			to: RECIPIENT,
			replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
			subject: `Demande traiteur : ${name}${details ? ` (${details})` : ''}`.slice(0, 200),
			text,
			html
		});
		return json({ success: true });
	} catch (err) {
		console.error('Traiteur mail error:', err);
		return json({ success: false }, { status: 500 });
	}
}
