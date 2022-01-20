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

