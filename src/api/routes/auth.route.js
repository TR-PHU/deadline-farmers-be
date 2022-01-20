const { application } = require('express');
const authController = require('../controllers/auth.controller');
const router = require('express').Router();

router.get('/getallusers', authController.GetAllUsers)

router.post('/register', authController.Register)

module.exports = router;