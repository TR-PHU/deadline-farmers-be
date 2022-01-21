const Cart = require('../models/cart');
const CreateError = require('http-errors');
module.exports = {
    getCartByUserId: async ({ userId }) => {
        try {
            const res = Cart.find({ _id, userId });
            console.log(res);
            // if (res.length === 1) {
            //     return;
            // }
        } catch (error) {}
    },
};
