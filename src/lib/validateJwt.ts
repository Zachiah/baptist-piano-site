import type { Token } from '@prisma/client';
import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import prismaInstance from './prismaInstance';
import { JWT_SECRET, JWT_ALGORITHM } from './sensitiveConfig';

const tokenIdSchema = Joi.number().integer();

const validateJwt = async (
	jwt: string
): Promise<{ value: Token | null; error: string | null }> => {
	try {
		const decoded = jsonwebtoken.verify(jwt, JWT_SECRET);

		const { tokenId } = decoded as { tokenId: number };

		const { error } = tokenIdSchema.validate(tokenId);

		if (error) {
			return {
				value: null,
				error: 'Invalid token'
			};
		}

		const fetchedToken = await prismaInstance.token.findUnique({
			where: {
				id: tokenId
			},
			include: {
				user: true
			}
		});

		if (!fetchedToken || !fetchedToken.valid) {
			return {
                value: null,
                error: 'Invalid token'
            };
		}

        if (fetchedToken.expiration < new Date()) {
            return {
                value: null,
                error: 'Token expired'
            };
        }

        return {
            value: fetchedToken,
            error: null
        };
	} catch (error) {
		return {
            value: null,
            error: 'Invalid token'
        }
	}
};

export default validateJwt;