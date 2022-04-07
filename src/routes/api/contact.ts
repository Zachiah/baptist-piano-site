import composeMiddleware from '$lib/middleware/composeMiddleware';
import withSchema from '$lib/middleware/withSchema';
import withUser from '$lib/middleware/withUser';
import sendEmail from '$lib/sendEmail';
import { NOREPLY_EMAIL } from '$lib/sensitiveConfig';
import Joi from 'joi';

const schema = Joi.object({
	message: Joi.string().required()
});

export const get = composeMiddleware(
	withSchema({ schema }),
	withUser
)(async (event) => {
	event.middleware.schemaValue;

	sendEmail({
		to: NOREPLY_EMAIL,
		subject: `${event.middleware.user.firstName ?? event.middleware.user.email} has contacted you`,
		text: `
            Reply to: ${event.middleware.user.email};

        `
	});

	return { status: 500, body: { message: 'unimplemented' } };
});
