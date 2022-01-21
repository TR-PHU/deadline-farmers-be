const cartService = require('../services/cart.service');

module.exports = {
    getCartByUserId: async (req, res, next) => {
        try {
            let DTO = cartService.getCartByUserId(req.user.userId);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
