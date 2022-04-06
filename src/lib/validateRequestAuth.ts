import type { Token } from '@prisma/client';
import getJwt from './getJwt';
import validateJwt from './validateJwt';

const validateRequestAuth = async (
	req: Request
): Promise<{ error: string | null; value: Token | null }> => {
	const { error: jwtError, value: jwt } = getJwt(req);

	if (jwtError) {
		return {
			error: jwtError,
			value: null
		};
	}

	const { error: decodedError, value: decoded } = await validateJwt(jwt);

	if (decodedError) {
		return {
			error: decodedError,
			value: null
		};
	}

	return {
		error: null,
		value: decoded
	};
};

export default validateRequestAuth;
