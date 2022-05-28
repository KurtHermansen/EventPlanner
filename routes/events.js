const express = require('express');
const router = express.Router();
const validation = require('../util/validation');

const eventsController = require('../controllers/events');

router.get('/', eventsController.getAll);
router.post('/', validation.eventCheck, eventsController.createEvent);
router.put('/:id', validation.eventCheck, eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);


module.exports = router;
