const request = require('supertest');
const app = require('../index');

describe('Bid API', () => {
    // Test GET /items/:itemId/bids
    it('should retrieve all bids for a specific item', async () => {
        const response = await request(app)
            .get('/items/123/bids'); // Replace 123 with the actual item ID
        expect(response.statusCode).toBe(200);
    });

    // Test POST /items/:itemId/bids
    it('should place a new bid on a specific item', async () => {
        const response = await request(app)
            .post('/items/123/bids') // Replace 123 with the actual item ID
            .set('Authorization', 'Bearer <token>') // Replace <token> with a valid JWT token
            .send({ amount: 100 }); // Example bid amount
        expect(response.statusCode).toBe(200);
    });
});
