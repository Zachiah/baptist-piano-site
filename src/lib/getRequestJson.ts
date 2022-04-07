const getRequestJson = async (
	request: Request | Response
): Promise<{ error: null | string; value: any | null }> => {
	try {
		return await {
			value: await request.json(),
			error: null
		};
	} catch (error) {
		return {
			error: 'Invalid JSON',
			value: null
		};
	}
};

export default getRequestJson;
