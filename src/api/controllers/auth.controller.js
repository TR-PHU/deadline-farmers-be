const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

module.exports = {
    Register: async (req, res, next) => {
        try {
            const DTO = await authService.Register(req.body);
            const token = jwt.sign({ ...DTO }, process.env.JWT_SECRET);

            res.status(200).json({
                message: 'Success!',
                token: token,
            });
        } catch (error) {
            next(error);
        }
    },
    GetAllUsers: async (req, res, next) => {
        try {
            const DTO = await authService.GetAllUsers();
            return res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    forgetPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const DTO = await authService.forgetPassword(email);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { newPassword, token } = req.body;
            const DTO = await authService.resetPassword(userId, token, newPassword);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
