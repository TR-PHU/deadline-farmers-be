const router = require('express').Router();
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const cartRoute = require('./cart.route');
const orderRoute = require('./order.route');

router.use('/auth', authRoute);

router.use('/product', productRoute);

router.use('/cart', cartRoute);
router.use('/order', orderRoute);

module.exports = router;
