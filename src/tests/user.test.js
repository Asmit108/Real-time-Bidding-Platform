const request = require('supertest');
const app = require('../index');

describe('Users API', () => {
    // Test POST /users/register
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({ /* Add valid user registration data */ });
        expect(response.statusCode).toBe(201);
    });

    // Test POST /users/login
    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({ /* Add valid user login data */ });
        expect(response.statusCode).toBe(200);
    });

    // Test GET /users/profile
    it('should get the profile of the logged-in user', async () => {
        const response = await request(app)
            .get('/users/profile')
            .set('Authorization', 'Bearer /* Add valid JWT token */');
        expect(response.statusCode).toBe(200);
    });

});
