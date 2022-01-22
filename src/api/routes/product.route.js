const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const { verifyToken } = require('../middlewares/verifyToken');

//get product by id

//create product(Admin role)

router.delete('/delete-product/:id', verifyToken, verifyAdmin, productController.deleteProduct);

router.put('/update-product/:id', verifyToken, verifyAdmin, productController.updateProductById);
router.get('/detail/:id', productController.getProductById);
router.get('/', productController.getAllProduct);
router.post('/', productController.createProduct);

module.exports = router;
