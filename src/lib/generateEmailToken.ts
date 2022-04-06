import { EMAIL_TOKEN_LENGTH } from './config';

function generateEmailToken(): string {
	return Math.floor(
		Math.pow(10, EMAIL_TOKEN_LENGTH - 1) + Math.random() * 9 * Math.pow(10, EMAIL_TOKEN_LENGTH - 1)
	).toString();
}

export default generateEmailToken;
