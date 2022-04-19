import generateEmailToken from './generateEmailToken';
import { EMAIL_TOKEN_LENGTH } from './config';

import { describe, it, expect } from 'vitest';

describe('generateEmailToken', () => {
	it('should return a string of length EMAIL_TOKEN_LENGTH', () => {
		expect(generateEmailToken()).toHaveLength(EMAIL_TOKEN_LENGTH);
	});
});
