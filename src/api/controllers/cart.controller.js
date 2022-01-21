const cartService = require('../services/cart.service')

module.exports = {
    CreateCart: async(req, res, next) => {
        try {
            const DTO = await cartService.CreateCart(req.body);
            
            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    }, 
    getCartByUserId: async (req, res, next) => {
        try {
            let DTO = cartService.getCartByUserId(req.user.userId);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
