const router = require('express').Router();
const authController = require('../controllers/auth.controller');
router.post('/register', authController.register);
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
