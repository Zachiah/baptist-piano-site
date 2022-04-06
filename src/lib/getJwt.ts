import cookie from 'cookie';

const getJwt = (req: Request) => {
	const cookies = cookie.parse(req.headers.get('cookie') || '');

	const { jwt } = cookies;

	if (!jwt) {
		return {
			error: 'Unauthenticated',
			value: null
		};
	}

	return {
		error: null,
		value: jwt
	};
};

export default getJwt;
