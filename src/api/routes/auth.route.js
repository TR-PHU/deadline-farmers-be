const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.Register);

router.get('/getallusers', authController.GetAllUsers)

// router.post('/sign-in', authController.signIn);
// router.post('/forget-password', authController.forgetPassword);
// router.post('/reset-password', authController.resetPassword);
module.exports = router;
