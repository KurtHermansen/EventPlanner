const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('event-planner').collection('venues').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(response.error || 'Error occurred while gathering information');
  }
};

const createVenue = async (req, res) => {
  try {
    const address = req.body.address;
    const location = req.body.locationName;
    const capacity = req.body.capacity;
    const indoor = req.body.indoor;
    if (!address || !location || !capacity || !indoor) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const venue = {
      address: address,
      locationName: location,
      capacity: capacity,
      indoor: indoor
    };
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('venues')
      .insertOne(venue);
    if (response.acknowledged) {
      res.status(202).json(response);
    }
  } catch (err) {
    res.status(500).json(response.error || 'Error occurred while creating Venue');
  }
};

const updateVenue = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid venue id to find a venue.');
    } else if (
      !req.body.address ||
      !req.body.locationName ||
      !req.body.capacity ||
      !req.body.indoor
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const venueId = new ObjectId(req.params.id);
    const updatedVenue = {
      address: req.body.address,
      locationName: req.body.locationName,
      capacity: req.body.capacity,
      indoor: req.body.indoor
    };

    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('venues')
      .replaceOne({ _id: venueId }, updatedVenue);
    if (response.acknowledged) {
      res.status(202).json(response);
    }
  } catch (err) {
    res.status(500).json(response.error || 'Error occurred while creating event');
  }
};

const deleteVenue = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid event id to delete a event.');
    }
    const venueId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('venues')
      .deleteOne({ _id: venueId });
    if (response.acknowledged) {
      res.status(202).json(response);
    }
  } catch (err) {
    res.status(500).json(response.error || 'Error occurred while deleting Venue');
  }
};

module.exports = { getAll, createVenue, updateVenue, deleteVenue };
