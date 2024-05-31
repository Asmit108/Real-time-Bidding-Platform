const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwtProvider = require('../config/jwtProvider')
const createUser = async (userData) => {
    try {
        let {userName, password, email} = userData;

        const isUserExist = await User.findOne({ email })

        if (isUserExist) {
            throw new Error('User already exists with email:', email)
        }
        password = await bcrypt.hash(password, 8);

        const user = await User.create({ userName,password,email});

        console.log("created user ", user);

        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = await jwtProvider.getUserIdFromToken(token);

        const user = await findUserById(userId)
        if (!user) {
            throw new Error("User not found with id:", userId);
        }

        return user

    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email:email});
        if (!user) {
            throw new Error("User not found with email:", email);
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={createUser,getUserProfileByToken,findUserByEmail}