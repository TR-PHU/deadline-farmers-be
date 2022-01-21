const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/add-order', verifyToken, orderController.addOrder);

module.exports = router;
