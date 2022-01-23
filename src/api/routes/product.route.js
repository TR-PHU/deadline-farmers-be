const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const multer = require('multer');
const storage = require('../middlewares/CloudinaryStorage');
const upload = multer({ storage: storage });
//product search
router.get('/search', productController.searchProduct);
router.get('/:id', productController.getProductById);
//get all product
router.get('/', productController.getAllProduct);
//create product(Admin role)
router.post('/', verifyToken, verifyAdmin, upload.single('image'), productController.createProduct);
//delete product
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);
//update product
router.put(
    '/:id',
    verifyToken,
    verifyAdmin,
    upload.single('image'),
    productController.updateProductById
);
module.exports = router;
