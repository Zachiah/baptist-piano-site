import getRequestJson from '$lib/getRequestJson';
import type Joi from 'joi';
import type { ConfigurableApiMiddleware } from '../types';

const withApiSchema: ConfigurableApiMiddleware<{ schema: Joi.Schema }, { schemaValue: any }> =
	(conf) => (cb) => async (event) => {
		const { value: jsonValue, error: jsonError } = await getRequestJson(event.request);

		if (jsonError) {
			return {
				status: 400,
				body: {
					msg: jsonError
				}
			};
		}

		const { value: schemaValue, error: schemaError } = conf.schema.validate(jsonValue);

		if (schemaError) {
			return {
				status: 400,
				body: {
					msg: schemaError.message
				}
			};
		}

		return cb({
			...event,
			middleware: {
				...event.middleware,
				schemaValue
			}
		});
	};

export default withApiSchema;
