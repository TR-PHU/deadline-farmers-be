const Cart = require('../models/cart');
const createError = require('http-errors');
module.exports = {
    CreateCart: async (userId, products) => {
        try {
            const findCart = await Cart.find({ userId });
            if (findCart.length > 0) {
                const productsList = findCart[0].products.concat(products);

                const res = await Cart.updateOne(
                    { userId },
                    {
                        $set: {
                            products: productsList,
                        },
                    }
                );

                return {
                    statusCode: 201,
                    msg: 'ok',
                };
            }

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
            console.log(res);
            return res;
        } catch (error) {
            if (error) throw error;

            throw new createError(500, 'Interval server errors');
        }
    },
};
