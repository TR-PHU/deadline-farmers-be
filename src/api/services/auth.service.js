const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendMail = require('../../commons/emails/sendMail');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    Register: async (body) => {
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
                    password: hashPassword,
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
    },
    GetAllUsers: async () => {
        try {
            const res = await User.find();
            return res;
        } catch (error) {
            throw new createError(500, 'Cannot get all users!');
        }
    },
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
    signIn: async ({ username, password: plainPassword }) => {
        try {
            const user = await User.find({ username }).lean();
            if (user.length > 1) {
                console.log(user);
                const accessToken = jwt.sign(
                    {
                        username: filterUser[0].username,
                    },
                    process.env.JWT_SECRET
                );
                const refreshToken = jwt.sign(
                    {
                        username: filterUser[0].username,
                        accessToken: accessToken,
                    },
                    process.env.JWT_SECRET
                );
                if (await bcrypt.compare(plainPassword, filterUser[0].password)) {
                    return {
                        error: false,
                        msg: 'Login success',
                        token: {
                            accessToken,
                            refreshToken,
                        },
                    };
                }
            } else {
                return new createError(404, 'User not found');
            }
        } catch (error) {
            throw new createError(500, 'Can not login');
        }
    }
};
