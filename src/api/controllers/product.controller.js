const productService = require('../services/product.service');

module.exports = {
    GetProductById: async (req, res, next) => {
        try {
            const DTO = await productService.GetProductById(req.params.id);

            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    CreateProduct: async (req, res, next) => {
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
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
