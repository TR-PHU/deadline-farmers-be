const product = require('../models/product');
const productService = require('../services/product.service');
module.exports = {
    getProductById: async (req, res, next) => {
        try {
            const DTO = await productService.getProductById(req.params.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const DTO = await productService.CreateProduct(req);
            res.status(DTO.statusCode).json({ message: DTO.msg });
        } catch (error) {
            next(error);
        }
    },
    getAllProduct: async (req, res, next) => {
        try {
            console.log(req.query);
            const { page: qPage, sort: qSort } = req.query;
            const DTO = await productService.getAllProduct(qPage, qSort);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const DTO = await productService.deleteProductById(req.params.id);

            return res.json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateProductById: async (req, res, next) => {
        try {
            const DTO = await productService.updateProductById(req);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    searchProduct: async (req, res, next) => {
        try {
            const DTO = await productService.searchProduct(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
