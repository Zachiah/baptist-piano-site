import getRequestFormData from '$lib/getRequestFormData';
import getRequestJson from '$lib/getRequestJson';
import type Joi from 'joi';
import type { ApiMiddleware, ConfigurableApiMiddleware } from '../types';

const withFormData: ApiMiddleware<{ formData: any }> = (cb) => async (event) => {
	const { value: formData, error: formDataError } = await getRequestFormData(event.request);

	if (formDataError) {
		return {
			status: 400,
			body: {
				msg: formDataError
			}
		};
	}

	return cb({
		...event,
		middleware: {
			...event.middleware,
			formData
		}
	});
};

export default withFormData;
