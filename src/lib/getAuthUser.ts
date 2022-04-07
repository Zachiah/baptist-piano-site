import type { User } from '@prisma/client';
import prismaInstance from './prismaInstance';
import validateRequestAuth from './validateRequestAuth';

const getAuthUser = async (req: Request): Promise<{ error: string | null; value: User | null }> => {
	const { value: vraValue, error: vraError } = await validateRequestAuth(req);

	if (vraError) {
		return {
			error: vraError,
			value: null
		};
	}

	const user = await prismaInstance.user.findUnique({
		where: {
			id: vraValue.userId
		}
	});

	if (!user) {
		return {
			error: 'User not found',
			value: null
		};
	}

	return {
		error: null,
		value: user
	};
};

export default getAuthUser;
