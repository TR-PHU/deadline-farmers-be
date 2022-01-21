const Cart = require('../models/cart');
const createError = require('http-errors');

module.exports = {
    CreateCart: async ({ userId, products }) => {
        try {
            const userCart = await Cart.find({ userId });
            if (userCart) {
                throw new createError(400, 'User already have cart!');
            }
            const res = await Cart.create({
                userId,
                products,
            });
            console.log(res);
            return res;
        } catch (error) {
            if (error) throw error;
            throw new createError(500, 'Interval server errors');
        }
    },
};
