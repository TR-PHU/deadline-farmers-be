const cartService = require('../services/cart.service');

module.exports = {
    updateCart: async (req, res, next) => {
        try {
            const DTO = await cartService.updateCart(req.user.userId, req.body.products);

            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getCartByUserId: async (req, res, next) => {
        try {
            let DTO = await cartService.getCartByUserId(req.user.userId);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
