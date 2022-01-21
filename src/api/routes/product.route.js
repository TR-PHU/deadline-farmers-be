const router = require('express').Router();
const productController = require('../controllers/product.controller');
//get product by id
router.get('/:id', productController.GetProductById)
//create product(Admin role)
router.post('/', productController.CreateProduct)

module.exports = router;