const Notification= require('../models/notification.model');
const User= require('../models/user.model');

const getNotifications = async (userId) => {
    return await Notification.findAll({ where: { userId } });
};

const markNotificationsAsRead = async (userId) => {
    return await Notification.update({ is_read: true }, { where: { userId, is_read: false } });
};

const createNotification = async (userId, message) => {
    return await Notification.create({
        user_id: userId,
        message: message
    });
};

module.exports = { getNotifications, markNotificationsAsRead,createNotification };
