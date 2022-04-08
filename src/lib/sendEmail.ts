import sgMail from '@sendgrid/mail';
import { NOREPLY_EMAIL, SENDGRID_API_KEY } from './sensitiveConfig';
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async function (p: { to: string; subject: string; text: string; html?: string }) {
	const msg = {
		to: p.to,
		from: NOREPLY_EMAIL,
		subject: p.subject,
		text: p.text,
		html: p.html
	};

	if (SENDGRID_API_KEY.trim()) {
		await sgMail.send(msg);
	} else {
        // TODO: WRITE TO LOG FILE;
		console.log(msg)
	}
};

export default sendEmail;
