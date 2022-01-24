const createError = require('http-errors');
const Order = require('../models/order');
const Product = require('../models/product')

module.exports = {
    addOrder: async (userId, products) => {
        try {
            // const newOrder = new Order({ userId, products });
            // await newOrder.save();
            const order = await Order.updateOne({ userId}, {
                $push: {
                    products: { $each: [...products]}
                }
            });
            console.log(order);

            return {
                statusCode: 200,
                message: 'Payment success',
            };
        } catch (error) {
            if(error) throw new createError(error);
            throw new createError(500, "Interval server errors")
        }
    },
    getOrder: async (Id) => {
        try {
            let res = await Order.find({ userId: Id });
            if (res.length === 0) {
                return [];
            }

            for (let i of res[0].products) {
                const resDB = await Product.findById(i.productId);
                if (resDB) {
                    i.name = resDB.name;
                    i.image = resDB.image;
                }
            }

            return {
                statusCode: 200,
                message: 'Getting order successful',
                order: res,
            };
        } catch (error) {
            throw new createError(error);
        }
    },
};
