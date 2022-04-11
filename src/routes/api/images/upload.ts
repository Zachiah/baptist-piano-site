import withApiUser from '$lib/middleware/api/withApiUser';
import withFormData from '$lib/middleware/api/withFormData';
import { composeApiMiddleware } from '$lib/middleware/utils';
import uploadImage from '$lib/uploadImage';

export const post = composeApiMiddleware(
	withApiUser
	// withFormData
)(async (event) => {
	const formData = await event.request.formData();

	const { value: url, error } = await uploadImage(formData.get('image'));

	if (error) {
		return {
			status: 400,
			body: {
				msg: error
			}
		};
	}
	
	return {
		status: 200,
		body: {
			success: 1,
			file: {
				url: url
			}
		}
	};
});
