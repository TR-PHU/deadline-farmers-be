const createError = require('http-errors');
const Cart = require('../models/cart');
const Order = require('../models/order');

module.exports = {
    addOrder: async (userId) => {
        try {
            const deleteCart = await Cart.findOneAndDelete({ userId });
            const { products } = deleteCart;
            const newOrder = new Order({ userId, products });
            await newOrder.save();
            return {
                statusCode: 200,
                message: 'Payment success',
                newOrder,
            };
        } catch (error) {
            throw new createError(error);
        }
    },
    getOrder: async (Id) => {
        try {
            const res = await Order.find({ userId: Id });
            console.log(res[0].products);
            return {
                statusCode: 200,
                message: 'Getting order successful',
                order: res[0].products,
            };
        } catch (error) {
            throw new createError(error);
        }
    },
};
