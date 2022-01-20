<<<<<<< HEAD
const auth = require('./auth.route');
const router = require('express').Router();

router.use('/auth', auth);

module.exports = router;
=======
const router = require('express').Router();
const authRoute = require('./auth.route');
router.use('/auth', authRoute);
module.exports = router;
>>>>>>> c17d5d95871156150ade6f04a9690878ee256365
