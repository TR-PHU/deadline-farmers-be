const Product = require('../models/product');
const CreateError = require('http-errors');
const createError = require('http-errors');
const cloudinary = require('../configs/cloudinary.config');
const upload = require('../configs/multer.config');
module.exports = {
    GetProductById: async (productId) => {
        try {
            const res = await Product.find({ _id: productId });
            console.log(res);
            if (!res) {
                throw new CreateError(404, 'Product not found!');
            }
            return res;
        } catch (error) {
            if (error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
    },
    CreateProduct: async (req) => {
        try {
            const { name, price, categories, quantity, description, rating } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);
            let product = new Product({
                name: name,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                price: price,
                categories: categories,
                quantity: quantity,
                description: description,
                rating: rating,
            });
            //Save product
            await product.save();
            return {
                statusCode: 200,
                msg: 'Successfully created a product',  
            };
        } catch (error) {
            throw new CreateError(500, 'Internal server errors');
        }
    },
    getAllProduct: async (qPage) => {
        const PAGE_SIZE = 12;
        try {
            if (qPage) {
                qPage = parseInt(qPage);
                qPage < 0 ? (qPage = 1) : qPage;
                const startIndex = (qPage - 1) * PAGE_SIZE;
                const products = await Product.find().skip(startIndex).limit(PAGE_SIZE);
                return {
                    statusCode: 200,
                    products,
                };
            } else {
                const products = await Product.find();
                return {
                    statusCode: 200,
                    products,
                };
            }
        } catch (error) {
            throw new CreateError(error);
        }
    },
};
