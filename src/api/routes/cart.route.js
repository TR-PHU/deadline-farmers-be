const router = require('express').Router();
const cartController = require('../controllers/cart.controller');

// get cart by user id
router.get('/:id', cartController.getCartByUserId);
