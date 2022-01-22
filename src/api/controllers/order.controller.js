const orderService = require('../services/order.service');

module.exports = {
    addOrder: async (req, res, next) => {
        const userId = req.user.userId;
        const { products } = req.body;
        if (!products) {
            res.status(400).json({ statusCode: 400, message: 'Product is required.' });
        }
        try {
            const DTO = await orderService.addOrder(userId, products);
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
