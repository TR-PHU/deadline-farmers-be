const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { authValidate, schema } = require('../../validations/AuthValidate')

router.post('/register', authValidate(schema.register), authController.Register);

router.post('/sign-in', authValidate(schema.login), authController.signIn);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', verifyToken, authController.resetPassword);

module.exports = router;
