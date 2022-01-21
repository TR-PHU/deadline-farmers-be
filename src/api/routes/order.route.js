const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/add-order', verifyToken, orderController.addOrder);
router.get('/get-order', verifyToken, orderController.getOrder);
module.exports = router;
