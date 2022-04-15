import withApiSchema from '$lib/middleware/api/withApiSchema';
import withApiUser from '$lib/middleware/api/withApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import uploadImage from '$lib/uploadImage';
import Joi from 'joi';

export const post = composeApiMiddleware(
	withApiUser,
	withApiSchema({
		schema: Joi.object({
			url: Joi.string().required()
		})
	})
)(async (event) => {
	const initialURL = event.middleware.schemaValue.url;

	// fetch the image as a File
	try {
		const image = await fetch(initialURL).then((response) => response.blob());

		const url = await uploadImage(image);

		return {
			status: 200,
			body: {
				success: 1,
				file: {
					url: url
				}
			}
		};
	} catch (error) {
		return {
			status: 400,
			body: {
				success: 0,
				error: error.message
			}
		};
	}
});
