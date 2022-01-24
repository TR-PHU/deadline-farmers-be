const createError = require('http-errors');
const { log } = require('util');
const Order = require('../models/order');
const Product = require('../models/product');

const searchProduct = async (productId) => {
    const product = await Product.findById(productId);
    return product;
};

module.exports = {
    addOrder: async (userId, products) => {
        try {
            const order = await Order.updateOne(
                { userId },
                {
                    $push: {
                        products: { $each: [...products] },
                    },
                }
            );
            if (!order.modifiedCount) {
                const newOrder = new Order({ userId, products });
                await newOrder.save();
            }
            return {
                statusCode: 200,
                message: 'Payment success',
            };
        } catch (error) {
            if (error) throw new createError(error);
            throw new createError(500, 'Interval server errors');
        }
    },
    getOrder: async (id) => {
        try {
            let res = await Order.find({ userId: id });

            console.log(res);
            if (res.length == 0) {
                return [];
            }

            return res;
        } catch (error) {
            throw new createError(error);
        }
    },
};
