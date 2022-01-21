const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/get-all-product', productController.getAllProduct);
//get product by id
router.get('/:id', productController.GetProductById);

//create product(Admin role)
router.post('/', productController.CreateProduct);

module.exports = router;
