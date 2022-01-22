const productService = require('../services/product.service');

module.exports = {
    cetProductById: async (req, res, next) => {
        try {
            const DTO = await productService.GetProductById(req.params.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const DTO = await productService.CreateProduct(req.body);

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
            const DTO = await productService.DeleteProductById(req.params.id);
            
            return res.json(DTO);
        } catch (error) {
            next(error);
        }
    },
    modifyProductById: async (req, res, next) => {
        try {
            const DTO = await productService.modifyProductById(req.params.id, res.body);
        } catch (error) {
            next(error);
        }
    }
    
};
