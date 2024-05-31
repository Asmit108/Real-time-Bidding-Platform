const userService = require('../services/user.service')
const jwtProvider = require('../config/jwtProvider')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { ValidationError, AuthenticationError, AuthorizationError, NotFoundError } = require('../errors');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
        const jwt = jwtProvider.generateToken(user._id)

        return res.status(200).json({ jwt, message: "registration success" })
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
}

const login = async (req, res) => {
    try {
        const { password, email } = req.body
        const user = userService.findUserByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "user not found with email:", email })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password..." })
        }

        const jwt = jwtProvider.generateToken(user._id)
        return res.status(200).json({ jwt, message: "login success" })

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
}

const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            return res.status(404).json({ error: "token not found" })
        }
        const user = await userService.getUserProfileByToken(jwt)
        return res.status(200).json(user)
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
}

module.exports = { register, login, getUserProfile }