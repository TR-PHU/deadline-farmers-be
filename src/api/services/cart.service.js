const Cart = require('../models/cart');
const createError = require('http-errors');
module.exports = {
    CreateCart: async (userId, products) => {
        try {
            const res = await Cart.create({
                userId,
                products,
            });
            return res;
        } catch (error) {
            if (error) throw error;
            throw new createError(500, 'Interval server errors');
        }
    },
    getCartByUserId: async (id) => {
        try {
            const res = await Cart.find({ userId: id });
            return res;
        } catch (error) {
            if (error) throw error;

            throw new createError(500, 'Interval server errors');
        }
    },
};
