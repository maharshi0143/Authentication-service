const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';

const runTests = async () => {
    try {
        console.log('--- 1. Health Check ---');
        try {
            const res = await axios.get(`http://localhost:8080/health`);
            console.log('Status:', res.status, res.data);
        } catch (e) {
            console.error('Health Check Failed:', e.message);
        }

        console.log('\n--- 2. Register User ---');
        let user;
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, {
                name: 'Test Verify',
                email: `verify_${Date.now()}@example.com`,
                password: 'Password123!'
            });
            console.log('Status:', res.status, res.data);
            user = res.data;
        } catch (e) {
            console.error('Register Failed:', e.response?.data || e.message);
        }

        console.log('\n--- 3. Login User ---');
        let tokens;
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, {
                email: user?.email,
                password: 'Password123!'
            });
            console.log('Status:', res.status);
            tokens = res.data;
            console.log('Got tokens');
        } catch (e) {
            console.error('Login Failed:', e.response?.data || e.message);
        }

        if (tokens) {
            console.log('\n--- 4. Get Profile ---');
            try {
                const res = await axios.get(`${BASE_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${tokens.accessToken}` }
                });
                console.log('Status:', res.status, res.data);
            } catch (e) {
                console.error('Get Profile Failed:', e.response?.data || e.message);
            }

            console.log('\n--- 5. Refresh Token ---');
            try {
                const res = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken: tokens.refreshToken
                });
                console.log('Status:', res.status);
                console.log('New Access Token:', !!res.data.accessToken);
            } catch (e) {
                console.error('Refresh Failed:', e.response?.data || e.message);
            }
        }

        console.log('\n--- 6. RBAC Test (Admin vs User) ---');
        // Login as Admin (from seeds)
        try {
            const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
                email: 'admin@example.com',
                password: 'AdminPassword123!' // From seeds/003_seed_users.sql
            });
            const adminToken = loginRes.data.accessToken;

            // Try to list users
            const listRes = await axios.get(`${BASE_URL}/users`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            console.log('Admin List Users Access:', listRes.status === 200 ? 'PASS' : 'FAIL');
        } catch (e) {
            console.error('Admin Login/List Failed:', e.message);
        }

        // Try as regular user (from previous step)
        if (tokens) {
            try {
                await axios.get(`${BASE_URL}/users`, {
                    headers: { Authorization: `Bearer ${tokens.accessToken}` }
                });
                console.log('User List Users Access: FAIL (Should be forbidden)');
            } catch (e) {
                if (e.response && e.response.status === 403) {
                    console.log('User List Users Access: PASS (Got 403 Forbidden)');
                } else {
                    console.log('User List Users Access: FAIL (Got ' + e.response?.status + ')');
                }
            }
        }

        // Rate Limit Test
        console.log('\n--- 6. Rate Limit Test (15 attempts) ---');
        for (let i = 0; i < 15; i++) {
            try {
                await axios.post(`${BASE_URL}/auth/login`, {
                    email: 'fake@example.com',
                    password: 'wrong'
                });
                process.stdout.write('.');
            } catch (e) {
                if (e.response && e.response.status === 429) {
                    console.log('\nSuccess! Got 429 Too Many Requests on attempt', i + 1);
                    break;
                }
                process.stdout.write('.');
            }
        }

    } catch (err) {
        console.error('Unexpected Error:', err);
    }
};

runTests();
