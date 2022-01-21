const router = require('express').Router();
const authRoute = require('./auth.route');
const productRoute = require('./product.route');

router.use('/auth', authRoute);

router.use('/product', productRoute)


module.exports = router;
