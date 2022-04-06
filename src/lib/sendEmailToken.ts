import sendEmail from './sendEmail';

const sendEmailToken = async (email: string, emailToken: string) => {
	await sendEmail({
		to: email,
		subject: 'Login Token',
		text: `
            You have requested a login token.
            Please use the following token to login:
            ${emailToken}
        `
	});
};

export default sendEmailToken;
