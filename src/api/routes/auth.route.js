<<<<<<< HEAD
const { application } = require('express');
const authController = require('../controllers/auth.controller');
const router = require('express').Router();

router.get('/getallusers', authController.GetAllUsers)

router.post('/register', authController.Register)

module.exports = router;
=======
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
router.post('/register', authController.register);
router.post('/sign-in', authController.signIn);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
>>>>>>> c17d5d95871156150ade6f04a9690878ee256365
