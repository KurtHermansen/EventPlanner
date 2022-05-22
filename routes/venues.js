const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venues');

router.get('/', venuesController.getAll);
router.post('/', venuesController.createVenue);

module.exports = router;
