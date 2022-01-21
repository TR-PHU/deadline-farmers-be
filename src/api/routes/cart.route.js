const router = require('express').Router();
const cartController = require('../controllers/cart.controller')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.post('/',verifyAdmin ,cartController.CreateCart);

// get cart by user id
router.get('/:id', cartController.getCartByUserId);

module.exports = router;
