const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { authenticateSocket } = require('./middlewares/authenticate');
const Bid = require('./models/bid.model');
const Item = require('./models/item.model');
const Notification = require('./models/notification.model');
const notificationService = require('./services/notification.service');
const rateLimit = require('express-rate-limit');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define the rate limiting options
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

// Apply the rate limiter to all requests
app.use(limiter);

app.use(bodyParser.json());

// Routes
app.use('/api/items', require('./routes/item.routes'));
app.use('/api/bids', require('./routes/bid.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// Endpoint to request a password reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const users = {};

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('bid', async (message) => {
        const { itemId, bidAmount, userId } = message;

        // Broadcast the new bid to all connected clients
        socket.broadcast.emit('update', message);

        // Find the item and the current highest bid
        const item = await Item.findByPk(itemId);
        const highestBid = await Bid.findOne({
            where: { itemId },
            order: [['bidAmount', 'DESC']]
        });

        // Create notifications
        if (highestBid && highestBid.userId !== userId) {
            // Notify the previous highest bidder that they've been outbid
            await notificationService.createNotification(highestBid.userId, `You have been outbid on item ${item.name}.`);
        }

        // Notify the item owner about the new bid
        await notificationService.createNotification(item.ownerId, `New bid on your item ${item.name}.`);

        // Notify the user who placed the bid
        socket.emit('notification', {
            message: 'Your bid has been placed successfully!',
        });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
