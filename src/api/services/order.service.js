const createError = require('http-errors');
const Order = require('../models/order');
const Product = require('../models/product')

const searchProduct = async (productId) => {
    const product = await Product.findById(productId);
    return product;
};

module.exports = {
    addOrder: async (userId, products) => {
        try {
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
    getOrder: async(id) => {
        try {
            let res = await Order.find({ userId: id });

            if (res.length == 0) {
                return [];
            }
            let result = [];
            for (let i of res[0].products) {
                const resDB = await Product.findById(i.productId);
                if (resDB) {
                    i.name = resDB.name;
                    i.image = resDB.image;
                    result.push(i)
                }
            }
            
            return res;
        } catch (error) {
            throw new createError(error);
        }
    },
};
