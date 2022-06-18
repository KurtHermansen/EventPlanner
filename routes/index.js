const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/events', require('./events'));
router.use('/venues', require('./venues'));
router.use('/user', require('./auth'))

module.exports = router;
