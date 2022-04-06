import { expect, test } from '@playwright/test';

test('login api route validates data properly', async ({ page, request }) => {
	const res = await request.post('/auth/api/login', {
		data: {
			email: 'abc@123.com'
		}
	});

	expect(res.ok()).toBeTruthy();
});
