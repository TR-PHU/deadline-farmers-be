const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/update-cart', verifyToken, cartController.updateCart);

// get cart by user id
router.get('/get-cart', verifyToken, cartController.getCartByUserId);



module.exports = router;
