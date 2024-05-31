const express = require('express');
const notificationController= require('../controllers/notification.controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/notifications', authenticate, notificationController.getNotifications);
router.post('/notifications/mark-read', authenticate,authorize(['admin', 'owner']), notificationController.markNotificationsAsRead);

module.exports = router;
