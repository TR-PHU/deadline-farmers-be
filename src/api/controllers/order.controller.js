const orderService = require('../services/order.service');

module.exports = {
    addOrder: async (req, res, next) => {
        const userId = req.user.userId;
        try {
            const DTO = await orderService.addOrder(userId);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getOrder: async (req, res, next) => {
        const userId = req.user.userId;
        try {
            const DTO = await orderService.getOrder(userId);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
