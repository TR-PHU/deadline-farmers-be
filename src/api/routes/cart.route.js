const router = require('express').Router();
const cartController = require('../controllers/cart.controller')

router.post('/', cartController.CreateCart);

module.exports = router;