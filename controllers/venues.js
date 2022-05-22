const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('event-planner').collection('venues').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createVenue = async (req, res) => {
  const venue = {
    address: req.body.address,
    locationName: req.body.locationName,
    capacity: req.body.capacity,
    indoor: req.body.indoor
  };
  const response = await mongodb.getDb().db('event-planner').collection('venues').insertOne(venue);
  if (response.acknowledged) {
    res.status(202).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating Venue');
  }
};

const updateVenue = async (req, res) => {
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
    } else {
      res.status(500).json(response.error || 'Error occurred when updating venue.');
    }
  };


  const deleteVenue = async (req, res) => {
    const venueId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('venues')
      .deleteOne({ _id: venueId });
    if (response.acknowledged) {
      res.status(202).json(response);
    } else {
      res.status(500).json(response.error || 'Error has occurred while deleting venue');
    }
  };

module.exports = { getAll, createVenue, updateVenue, deleteVenue };
