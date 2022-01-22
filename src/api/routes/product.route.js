const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
//get all product
router.get('/', productController.getAllProduct);
//create product(Admin role)
router.post('/', upload.single('image'), verifyToken, verifyAdmin, productController.createProduct);
//delete product
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);
//update product
router.put('/:id', verifyToken, verifyAdmin, productController.updateProductById);

module.exports = router;
