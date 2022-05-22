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
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating Venue');
  }
};

module.exports = { getAll, createVenue };
