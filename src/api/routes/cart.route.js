const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/', verifyToken, cartController.CreateCart);

// get cart by user id
router.get('/', verifyToken, cartController.getCartByUserId);

module.exports = router;
