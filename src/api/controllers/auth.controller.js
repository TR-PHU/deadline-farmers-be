const authService = require('../services/auth.service');

module.exports = {
    register: async (req, res, next) => {},
    signIn: async (req, res, next) => {},
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
            const { password: newPassword, token } = req.body;
            const DTO = await authService.resetPassword(userId, token, newPassword);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
