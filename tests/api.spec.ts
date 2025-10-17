import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://fake-json-api.mock.beeceptor.com/users';

test.describe('API Testing - Users Endpoint', () => {

    test('GET - Fetch all users', async ({ request, page }) => {
        page.on('request', req => console.log('Request:', req.url()));
        page.on('response', res => console.log('Response:', res.status(), res.url()));
        const response = await request.get(API_BASE_URL);

        // Verify response status
        expect(response.status()).toBe(200);

        // Verify response headers
        // expect(response.headers()['content-type']).toContain('fake-json-api.mock.beeceptor.com/users');

        // Parse and verify response body
        const users = await response.json();
        expect(Array.isArray(users)).toBe(true);

        // Log response for debugging
        console.log('GET Users Response:', users);

        if (users.length > 0) {
            // Verify user object structure
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('name');
            console.log(users);
        }
    });

});
