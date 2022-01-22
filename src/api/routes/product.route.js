const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', productController.getAllProduct);
//get product by id
router.get('/:id', productController.getProductById);

//create product(Admin role)
router.post(
    '/',
    upload.single('image'),
    verifyToken,
    verifyAdmin,
    productController.createProduct
);
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);

router.put('/:id', verifyToken, verifyAdmin, productController.updateProductById);

module.exports = router;
