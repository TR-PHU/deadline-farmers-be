const router = require('express').Router();
const cartController = require('../controllers/cart.controller')


router.post('/', cartController.CreateCart);

// get cart by user id
router.get('/:id', cartController.getCartByUserId);

module.exports = router;
