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
<<<<<<< HEAD
            if (res.length == 0) {
                return {
                    statusCode: 200,
                    messgae: 'Getting order successful',
=======
            if (res.length === 0) {
                return {
                    statusCode: 200,
                    message: 'Getting order successful',
>>>>>>> 6d6b940d6bc3db4d294c5ee3f956cfd7628b0e8a
                    order: res,
                };
            }
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
