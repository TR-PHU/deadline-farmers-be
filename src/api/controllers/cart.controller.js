const cartService = require('../services/cart.service')

module.exports = {
    CreateCart: async(req, res, next) => {
        try {
            const DTO = await cartService.CreateCart(req.body);
            
            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    }
}