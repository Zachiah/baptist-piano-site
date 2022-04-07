import withApiSchema from '$lib/middleware/api/withApiSchema';
import withApiUser from '$lib/middleware/api/withApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import sendEmail from '$lib/sendEmail';
import { NOREPLY_EMAIL } from '$lib/sensitiveConfig';
import Joi from 'joi';

const schema = Joi.object({
	message: Joi.string().required()
});

export const get = composeApiMiddleware(
	withApiSchema({ schema }),
	withApiUser
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
