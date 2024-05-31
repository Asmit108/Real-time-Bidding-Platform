const request = require('supertest');
const app = require('../index');

describe('Notification API', () => {
    // Test GET /notifications
    it('should retrieve notifications for the logged-in user', async () => {
        const response = await request(app)
            .get('/notifications')
            .set('Authorization', 'Bearer <token>'); // Replace <token> with a valid JWT token
        expect(response.statusCode).toBe(200);
    });

    // Test POST /notifications/mark-read
    it('should mark notifications as read', async () => {
        const response = await request(app)
            .post('/notifications/mark-read')
            .set('Authorization', 'Bearer <token>') // Replace <token> with a valid JWT token
            .send({ notificationIds: [1, 2, 3] }); // Assuming the notification IDs to mark as read
        expect(response.statusCode).toBe(200);
    });
});

