const getRequestFormData = async (
	request: Request | Response
): Promise<{ error: null | string; value: any | null }> => {
	try {
		return await {
			value: await request.formData(),
			error: null
		};
	} catch (error) {
		return {
			error: 'Invalid FormData',
			value: null
		};
	}
};

export default getRequestFormData;
