const Cart = require('../models/cart');
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
};
