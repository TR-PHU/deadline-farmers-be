const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/get-all-products', productController.getAllProduct);
//get product by id
router.get('/:id', productController.cetProductById);

//create product(Admin role)
router.post('/', productController.createProduct);

router.delete('/delete-product/:id', verifyToken, verifyAdmin, productController.deleteProduct);

router.put('/update-product/:id', verifyToken, verifyAdmin, productController.modifyProductById);

module.exports = router;
