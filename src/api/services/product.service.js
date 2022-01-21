const Product = require('../models/product');
const CreateError = require('http-errors');

module.exports = {
    GetProductById: async (productId) => {
        try {
            const res = await Product.find({ _id: productId });
            if (!res) {
                throw new CreateError(404, 'Product not found!');
            }
            return res;
        } catch (error) {
            if (error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
    },
    CreateProduct: async (body) => {
        try {
            // const { name, image, price, catagories, quantity, description, rating } = body;
            const newProduct = new Product(body);
            const res = await newProduct.save();
            console.log(res);
            return {
                statusCode: 201,
                msg: 'ok'
            }
        } catch (error) {
            throw new CreateError(500, "Internal server errors")
        }
    },
};
