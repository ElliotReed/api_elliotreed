import nodemailer from 'nodemailer';

import { NodeEmail } from './email.types';
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: 'mail.elliotreed.net',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
	}
});

export default async function sendEmail(email: NodeEmail) {
	const info = await transporter.sendMail(email);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	console.log('Message sent: %s', info);
	return info;
}
