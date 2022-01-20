const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const sendMail = require('../../commons/emails/sendMail');

module.exports = {
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
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(newPassword, salt);
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
