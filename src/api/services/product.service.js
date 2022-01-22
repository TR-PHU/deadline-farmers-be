const Product = require("../models/product");
const CreateError = require("http-errors");
const createError = require("http-errors");
const cloudinary = require("../configs/cloudinary.config");
const mongoose = require("mongoose");
const upload = require("../configs/multer.config");
module.exports = {
    getProductById: async (productId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new createError(404, 'Product not found!');
            }
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
            const { name, price, category, quantity, description, rating } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);
            let product = new Product({
                name,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                price,
                category,
                quantity,
                description,
                rating,
            });
            console.log(result);
            //Save product
            await product.save();
            return {
                statusCode: 200,
                msg: 'Create Success!',
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
                qPage < 1 ? (qPage = 1) : qPage;
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
    deleteProductById: async (id) => {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                throw new createError(404, "Product not found");
            }
            const product = await Product.findById(id);

            if(!product) {
                throw new createError(404, "Product not found");
            }
            await cloudinary.uploader.destroy(product.cloudinary_id);

            await product.remove();
            
            return {
                statusCode: 202,
                msg: 'Delete Success!',
            };
        } catch (error) {
            if(error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
    },
    updateProductById: async ({ params, body, file }) => {
        try {
            const { name, description, price, quantity, rating, category } = body;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                throw new createError(404, "Product not found");
            }
            
            let product = await Product.findById(params.id);

            if(!product) {
                throw new createError(404, "Product not found");
            }
            //delete image in cloudinary
            await cloudinary.uploader.destroy(product.cloudinary_id);
            const result = await cloudinary.uploader.upload(file.path);
            product = await Product.updateOne( { _id: params.id }, {
                $set: {
                    name,
                    description,
                    image: result.secure_url,
                    cloudinary_id: result.public_id,
                    price,
                    quantity,
                    rating,
                    category, 
                }
            });

            return {
                statusCode: 204,
                msg: 'Update Success!',
            };
        } catch (error) {
            throw new CreateError(500, 'Interval server errors');
        }
    },
};
