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
            const DTO = await productService.createProduct(req.body);

            res.status(DTO.statusCode).json({ message: DTO.msg });
        } catch (error) {
            next(error);
        }
    },
    getAllProduct: async (req, res, next) => {
        try {
            let qPage = req.query.page;
            const DTO = await productService.getAllProduct(qPage);
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
            const DTO = await productService.updateProductById(req.params.id, req.body);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    }
    
};
