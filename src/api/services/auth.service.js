const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../../commons/emails/sendMail');
const { v4: uuidv4 } = require('uuid');
const resetToken = require('../models/resetToken');


module.exports = {
    Register: async (body) => {
        const { username, password, email, address, phone, fullname } = body;
        try {
            const user = await User.findOne({ $or: [{ email }, { username }] });
            if (user) {
                throw new createError(400, 'User already exist!');
            }
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
                { userId: responseDB._id, username, role: responseDB.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: '3h',
                }
            );
            const refreshToken = jwt.sign(
                { userId: responseDB._id, username, role: responseDB.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: '5h',
                }
            );
            return {
                statusCode: 201,
                message: 'Create user success!',
                token: {
                    accessToken,
                    refreshToken,
                },
            };
        } catch (error) {
            if (error) {
                throw error;
            }
            throw new createError(500, 'Cannot create User');
        }
    },
    signIn: async ({ email, password: plainPassword }) => {
        try {
            let filterUser = await User.find({ email: email });
            if (filterUser.length === 1) {
                if (await bcrypt.compare(plainPassword, filterUser[0].password)) {
                    const accessToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            email: filterUser[0].email,
                            role: filterUser[0].role,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '3h',
                        }
                    );
                    const refreshToken = jwt.sign(
                        {
                            userId: filterUser[0]._id,
                            email: filterUser[0].email,
                            role: filterUser[0].role,
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
                    throw new createError(401, 'Wrong Password');
                }
            } else {
                throw new createError(404, 'User not found');
            }
        } catch (error) {
            if (error) throw error;
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
    resetPassword: async (userId, token, newPassword) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
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
