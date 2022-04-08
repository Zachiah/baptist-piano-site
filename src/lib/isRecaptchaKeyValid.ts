import axios from 'axios';
import { SERVER_RECAPTCHA_API_KEY } from './sensitiveConfig';

const isRecaptchaKeyValid = async (recaptchaKey: string) => {
	const response = await axios.post(
		'https://www.google.com/recaptcha/api/siteverify',
		{},
		{
			params: {
				secret: SERVER_RECAPTCHA_API_KEY,
				response: recaptchaKey
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	);

	const json = response.data;

	return json.success;
};

export default isRecaptchaKeyValid;