<<<<<<< HEAD
const authService = require('../services/auth.service')

module.exports = {
    Register: async(req, res, next) => {
        try {
            const DTO = await authService.Register(req.body)
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    GetAllUsers: async(req, res, next) => {
        try {
            const DTO = await authService.GetAllUsers();
            return res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    }
}

=======
const authService = require('../services/auth.service');

module.exports = {
    register: () => {},
    signIn: () => {},
    forgetPassword: () => {},
    resetPassword: () => {},
};
>>>>>>> c17d5d95871156150ade6f04a9690878ee256365
