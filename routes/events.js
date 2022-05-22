const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

router.get('/', eventsController.getAll);
router.post('/', eventsController.createEvent);

module.exports = router;
