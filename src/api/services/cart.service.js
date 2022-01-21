const Cart = require('../models/cart');
const CreateError = require('http-errors');
const createError = require('http-errors');
module.exports = {
    CreateCart: async (userId, products) => {
        try {
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
            return res[0].products;
        } catch (error) {
            if (error) throw error;

            throw new createError(500, 'Interval server errors');
        }
    },
};
