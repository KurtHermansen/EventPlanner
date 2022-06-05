const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venues');

router.get('/', venuesController.getAll);
router.post('/', venuesController.createVenue);
router.put('/:id', venuesController.updateVenue);
router.delete('/:id', venuesController.deleteVenue);

module.exports = router;
