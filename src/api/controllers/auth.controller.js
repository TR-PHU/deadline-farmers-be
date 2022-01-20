const authService = require('../services/auth.service');

module.exports = {
    register: () => {},
    signIn: async (req, res, next) => {
        try {
            let DTO = await authService.signIn(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    forgetPassword: () => {},
    resetPassword: () => {},
};
