import withApiSchema from '$lib/middleware/api/withApiSchema';
import withApiUser from '$lib/middleware/api/withApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import sendEmail from '$lib/sendEmail';
import { NOREPLY_EMAIL } from '$lib/sensitiveConfig';
import Joi from 'joi';
import axios from 'axios';
import isRecaptchaKeyValid from '$lib/isRecaptchaKeyValid';

const schema = Joi.object({
	message: Joi.string().required(),
	recaptchaKey: Joi.string().required()
});

export const post = composeApiMiddleware(
	withApiSchema({ schema }),
	withApiUser
)(async (event) => {
	const recaptchaKey = event.middleware.schemaValue.recaptchaKey;

	const success = isRecaptchaKeyValid(recaptchaKey);

	if (!success) {
		return {
			status: 400,
			body: {
				error: 'Invalid recaptcha key'
			}
		};
	}
	

	sendEmail({
		to: NOREPLY_EMAIL,
		subject: `${event.middleware.user.firstName ?? event.middleware.user.email} has contacted you`,
		text: `
            Reply to: ${event.middleware.user.email}
			---------------
			Message: ${event.middleware.schemaValue.message}
        `,
		html: `
			Reply to: <a href="mailto:${event.middleware.user.email}">${event.middleware.user.email}</a>
			<br />
			<br />
			Message: ${event.middleware.schemaValue.message}
		`
	});

	return {
		status: 200,
		body: {
			message: 'Email sent'
		}
	};
});
