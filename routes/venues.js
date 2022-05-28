const express = require('express');
const router = express.Router();
const validation = require('../util/validation');

const venuesController = require('../controllers/venues');

router.get('/', venuesController.getAll);
router.post('/', validation.venueCheck, venuesController.createVenue);
router.put('/:id', validation.venueCheck, venuesController.updateVenue);
router.delete('/:id', venuesController.deleteVenue);


module.exports = router;
