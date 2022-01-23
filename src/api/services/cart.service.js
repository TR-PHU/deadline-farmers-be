const Cart = require('../models/cart');
const createError = require('http-errors');
const Product = require('../models/product');

module.exports = {
    updateCart: async (userId, products) => {
        try {
            if (products.length == 0) {
                const res = await Cart.deleteOne({ userId });
                console.log(res);
                if (res.deletedCount == 1) {
                    return {
                        statusCode: 200,
                        msg: 'Ok',
                    };
                } else {
                    throw new createError(500, 'Interval server errors');
                }
            }
            
            const findCart = await Cart.find({ userId });
            if (findCart.length > 0) {
                const res = await Cart.updateOne(
                    { userId },
                    {
                        $set: { products },
                    }
                );
                console.log(res);
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

            let res = await Cart.find({ userId: id });

            if(!res.length) {
                return [];
            }

            for(let i of res[0].products) {
                const resDB = await Product.findById(i.productId)
                i.name = resDB.name;
                i.image = resDB.image
            }
           
            return res;
        } catch (error) {
            if(error) throw error;
            throw new createError(500, 'Interval server errors');
        }
    },
};
