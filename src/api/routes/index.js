const auth = require('./auth.route')
const router = require('express').Router();

router.use('/auth', auth);

module.exports = router;
