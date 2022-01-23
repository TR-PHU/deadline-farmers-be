const Product = require('../models/product');
const CreateError = require('http-errors');
const createError = require('http-errors');
const cloudinary = require('../configs/cloudinary.config');
const mongoose = require('mongoose');
const upload = require('../configs/multer.config');
const fs = require('fs');
const util = require('util');
const deleteFile = util.promisify(fs.unlink);
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
<<<<<<< HEAD
            const { name, price, category, quantity, description, rating } = req.body;
=======
            const { name, price, category, description, rating } = req.body;
            if (!name || !description || !price) {
                throw new CreateError(400, 'Invalid input');
            }
            if (!req.file) throw new CreateError(400, 'Please upload file!');
>>>>>>> d9de4f4c5def927cfadc4a35a2f8972037c7a8ea
            const result = await cloudinary.uploader.upload(req.file.path);
            await deleteFile(req.file.path);
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
            //Save product
            await product.save();
            return {
                statusCode: 200,
                msg: 'Create Success!',
            };
        } catch (error) {
            if (error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
        x;
    },
    getAllProduct: async (qPage, qSort) => {
        const PAGE_SIZE = 12;
        let products;
        let startIndex;
        try {
            if (qPage) {
                qPage = parseInt(qPage);
                qPage < 1 ? (qPage = 1) : qPage;
                startIndex = (qPage - 1) * PAGE_SIZE;
            }
            if (qPage && !qSort) {
                products = await Product.find().skip(startIndex).limit(PAGE_SIZE);
            } else if (qPage && qSort) {
                if (qSort === 'asc') {
                    products = await Product.find()
                        .sort({ price: 1 })
                        .skip(startIndex)
                        .limit(PAGE_SIZE);
                } else if (qSort === 'desc') {
                    products = await Product.find()
                        .sort({ price: -1 })
                        .skip(startIndex)
                        .limit(PAGE_SIZE);
                }
            } else if (!qPage && qSort) {
                if (qSort === 'asc') {
                    products = await Product.find().sort({ price: 1 });
                } else if (qSort === 'desc') {
                    products = await Product.find().sort({ price: -1 });
                }
            } else {
                products = await Product.find();
            }
            return {
                statusCode: 200,
                products,
            };
        } catch (error) {
            throw new CreateError(error);
        }
    },
    deleteProductById: async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new createError(404, 'Product not found');
            }
            const product = await Product.findById(id);

            if (!product) {
                throw new createError(404, 'Product not found');
            }
            await cloudinary.uploader.destroy(product.cloudinary_id);

            await product.remove();

            return {
                statusCode: 202,
                msg: 'Delete Success!',
            };
        } catch (error) {
            if (error) throw error;
            throw new CreateError(500, 'Internal server errors');
        }
    },
    updateProductById: async ({ params, body, file }) => {
        try {
<<<<<<< HEAD
            const { name, description, price, quantity, rating, category } = body;
=======
            const { name, description, price, rating, category } = body;

>>>>>>> d9de4f4c5def927cfadc4a35a2f8972037c7a8ea
            if (!mongoose.Types.ObjectId.isValid(params.id)) {
                throw new createError(404, 'Product not found');
            }

<<<<<<< HEAD
=======
            if (!name || !description || !price) {
                throw new CreateError(400, 'Invalid input');
            }
            if (!req.file) throw new CreateError(400, 'Please upload file!');

>>>>>>> d9de4f4c5def927cfadc4a35a2f8972037c7a8ea
            let product = await Product.findById(params.id);

            if (!product) {
                throw new createError(404, 'Product not found');
            }
            //delete image in cloudinary
            await cloudinary.uploader.destroy(product.cloudinary_id);
            const result = await cloudinary.uploader.upload(file.path);

            await deleteFile(file.path);
            product = await Product.updateOne(
                { _id: params.id },
                {
                    $set: {
                        name,
                        description,
                        image: result.secure_url,
                        cloudinary_id: result.public_id,
                        price,
                        quantity,
                        rating,
                        category,
                    },
                }
            );

            return {
                statusCode: 204,
                msg: 'Update Success!',
            };
        } catch (error) {
            if (error) throw error;
<<<<<<< HEAD
            throw new CreateError(500, 'Interval server errors');
        }
    },
    searchProduct: async ({ name }) => {
        try {
            const res = await Product.find({ name: { $regex: name } });
            return {
                msg: 'successfully searched',
                res,
            };
        } catch (error) {
            if (error) throw error;
=======
>>>>>>> d9de4f4c5def927cfadc4a35a2f8972037c7a8ea
            throw new CreateError(500, 'Interval server errors');
        }
    },
};
