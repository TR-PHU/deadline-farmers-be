const createError = require('http-errors');
const Order = require('../models/order');
const Product = require('../models/product');

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
            return {
                statusCode: 200,
                message: 'Payment success',
            };
        } catch (error) {
            if (error) throw new createError(error);
            throw new createError(500, 'Interval server errors');
        }
    },
    getOrder: async (Id) => {
        try {
            let res = await Order.find({ userId: Id });
            if (res.length === 0) {
                return [];
            }
            let count = 0;
            let resDB = [];
            for (let i of res[0].products) {
                resDB[count] = await Product.findById(i.productId);
                if (resDB) {
                    i.name = resDB.name;
                    i.image = resDB.image;
                }
                x++;
                if (count === res[0].products.length) {
                    return {
                        statusCode: 200,
                        message: 'Getting order successful',
                        resDB,
                    };
                }
            }
        } catch (error) {
            throw new createError(error);
        }
    },
};
