const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const sendMail = require('../../commons/emails/sendMail');
const { v4: uuidv4 } = require('uuid');

const Register = async (body) => {
    try {
        const { username, password, email, address, phone, fullname } = body;
        const user_Name = await User.find({ username: username });
        const user_email = await User.find({ email: email });
        if (user_Name.length > 0) {
            throw new createError(400, 'Username already exist!');
        }
        if (user_email.length > 0) {
            throw new createError(400, 'Your email already exist!');
        }
        try {
            const salt = await bcrypt.genSalt(10);
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
        } catch (error) {
            throw error;
        }
    } catch (error) {
        if (error) {
            throw error;
        }
        throw new createError(500, 'Cannot create User');
    }
};

const GetAllUsers = async () => {
    try {
        const res = await User.find();
        return res;
    } catch (error) {
        throw new createError(500, 'Cannot get all users!');
    }
};

module.exports = {
    Register,
    GetAllUsers,
    forgetPassword: async (email) => {
        try {
            let info = await sendMail(email, uuidv4());
            return {
                messageId: info.messageId,
                statusCode: 200,
                message: 'Send success',
            };
        } catch (error) {
            throw new createError(error);
        }
    },
    resetPassword: async (userId, token) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            const isValidToken = await ResetToken.findOne({ userId, resetToken: token });
            if (!isValidToken) {
                throw new createError(400, 'Token is not valid');
            }
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { password: hashPassword },
                { new: true }
            );
            return {
                statusCode: 200,
                message: 'Reset password success',
            };
        } catch (error) {
            throw new createError(error);
        }
    },
};
