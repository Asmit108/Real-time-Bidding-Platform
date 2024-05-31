const notificationService = require('../services/notification.service');
const { ValidationError, AuthenticationError, AuthorizationError, NotFoundError } = require('../errors');

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id; 
        const notifications = await notificationService.getNotifications(userId);
        return res.status(200).json(notifications);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

const markNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user.id; 
        await notificationService.markNotificationsAsRead(userId);
        return res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { getNotifications, markNotificationsAsRead };
