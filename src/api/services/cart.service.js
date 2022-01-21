const Cart = require('../models/cart');
const CreateError = require('http-errors');
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
    getCartByUserId: async (id) => {
        try {
            const res = await Cart.find({ userId: id });
            if (res.length === 1) {
                return res[0].products;
            } else {
                throw new createError(404, 'User not found');
            }
        } catch (error) {
            if (error) throw error;

            throw new createError(500, 'Interval server errors');
        }
    },
};
