const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const sendMail = require('../../commons/emails/sendMail');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const resetToken = require('../models/resetToken');

const Register = async (body) => {
    try {
        const { username, password, email, address, phone, fullname } = body;
        // const user_Name = await User.find({ username: username });
        // const user_email = await User.find({ email: email });
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            throw new createError(400, 'User already exist!');
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
            const accessToken = jwt.sign(
                { userId: responseDB._id, username },
                process.env.JWT_SECRET,
                {
                    expiresIn: '3h',
                }
            );
            const refreshToken = jwt.sign(
                { userId: responseDB._id, username },
                process.env.JWT_SECRET,
                {
                    expiresIn: '5h',
                }
            );
            return {
                statusCode: 201,
                message: 'Create user success',
                token: {
                    accessToken,
                    refreshToken,
                },
            };
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
    signIn: async ({ username, password: plainPassword }) => {
        try {
            let filterUser = await User.find({ username: username });
            if (filterUser.length === 1) {
                if (await bcrypt.compare(plainPassword, filterUser[0].password)) {
                    const accessToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            username: filterUser[0].username,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '3h',
                        }
                    );
                    const refreshToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            username: filterUser[0].username,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '5h',
                        }
                    );
                    return {
                        error: false,
                        msg: 'Login success',
                        token: {
                            accessToken,
                            refreshToken,
                        },
                    };
                } else {
                    return createError(401, 'Wrong Password');
                }
            } else {
                return new createError(404, 'User not found');
            }
        } catch (error) {
            throw new createError(500, 'Can not login');
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
    resetPassword: async (userId, token, newPassword) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            console.log(userId);
            const isValidToken = await resetToken.findOne({
                userId,
                resetToken: token,
            });
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
