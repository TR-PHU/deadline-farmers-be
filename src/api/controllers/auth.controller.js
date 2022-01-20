const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken');

module.exports = {
    Register: async(req, res, next) => {
        try {
            const DTO = await authService.Register(req.body)
            const token =  jwt.sign({...DTO}, process.env.JWT_SECRET);
            
            res.status(200).json({
                message: 'Success!',
                token: token
            });
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
    },
    forgetPassword: () => {},
    resetPassword: () => {},
}

