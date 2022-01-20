const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const authController = require('../controllers/auth.controller');

const Register = async (body) => {
    try {
        const { username, password, email, address, phone, fullname } = body;
        const user = await User.find({ username });
        if (!user) {
            return createError(400, 'User already exist!');
        }
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt);

            const responseDB = await User.create({
                username,
                hashPassword,
                email,
                address,
                phone,
                fullname,
            });
            console.log('Response Database:', responseDB);
            return responseDB;
        } catch (error) {}
    } catch (error) {
        throw new createError(500, 'Cannot create User');
    }
};

const GetAllUsers = async () => {
    try {
        const res = await User.find();
        return res;
    } catch (error) {
        throw new createError(500, "Cannot get all users!");
    }
};

module.exports = { Register, GetAllUsers };
