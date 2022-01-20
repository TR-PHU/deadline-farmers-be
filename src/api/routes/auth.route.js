const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/register', authController.Register);

router.get('/getallusers', authController.GetAllUsers);

router.post('/sign-in', authController.signIn);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', verifyToken, authController.resetPassword);
module.exports = router;
