const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);

        const foundUser = await User.findByPk(user.id);
        if (!foundUser) return res.sendStatus(404);

        req.user = foundUser;
        next();
    });
};

module.exports = { authenticateToken };
