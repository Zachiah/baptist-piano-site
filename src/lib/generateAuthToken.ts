import jwt from "jsonwebtoken"
import { JWT_ALGORITHM, JWT_SECRET } from "./sensitiveConfig";

function generateAuthToken(tokenId: number): string {
	const jwtPayload = { tokenId };

	return jwt.sign(jwtPayload, JWT_SECRET, {
		algorithm: JWT_ALGORITHM,
		noTimestamp: true
	});
}

export default generateAuthToken;