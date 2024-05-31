const bidService = require('../services/bid.service');
const notificationService = require('../services/notification.service')
const { ValidationError, AuthenticationError, AuthorizationError, NotFoundError } = require('../errors');

const getBidsForItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const bids = await bidService.getBidsForItem(itemId);
        return res.status(200).json(bids);
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

const placeBid = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { bidAmount } = req.body;
        const userId = req.user.id;
        const bid = await bidService.placeBid(userId, itemId, bidAmount);

        const io = req.app.get('io');
        io.emit('bid', { itemId, bidAmount, userId });
        io.on('update', message => {
            const newNotification = notificationService.createNotification(item.user_id, message);
            newNotification.save();
        })
        return res.status(201).json(bid);
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

module.exports = { getBidsForItem, placeBid };
