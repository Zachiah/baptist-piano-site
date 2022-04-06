import generateEmailToken from '../../src/lib/generateEmailToken';
import { EMAIL_TOKEN_LENGTH } from '../../src/lib/config';

describe(generateEmailToken, () => {
	it('should return a string of length EMAIL_TOKEN_LENGTH', () => {
		expect(generateEmailToken()).toHaveLength(EMAIL_TOKEN_LENGTH);
	});
});
