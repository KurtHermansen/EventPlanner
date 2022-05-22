const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('event-planner').collection('events').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createEvent = async (req, res) => {
  const event = {
    time: req.body.time,
    date: req.body.date,
    venueID: req.body.venueID,
    ageGroup: req.body.ageGroup,
    food: req.body.food,
    sponsor: req.body.sponsor,
    theme: req.body.theme,
    cause: req.body.cause,
    eventPlanner: req.body.eventPlanner
  };
  const response = await mongodb.getDb().db('event-planner').collection('events').insertOne(event);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating event');
  }
};


const updateEvent = async (req, res) => {
    const eventId = new ObjectId(req.params.id);
    const updatedEvent = {
        time: req.body.time,
        date: req.body.date,
        venueID: req.body.venueID,
        ageGroup: req.body.ageGroup,
        food: req.body.food,
        sponsor: req.body.sponsor,
        theme: req.body.theme,
        cause: req.body.cause,
        eventPlanner: req.body.eventPlanner
    };
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('events')
      .replaceOne({ _id: eventId }, updatedEvent);
    if (response.acknowledged) {
      res.status(202).json(response);
    } else {
      res.status(500).json(response.error || 'Error occurred when updating event.');
    }
  };


  const deleteEvent = async (req, res) => {
    const eventId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('events')
      .deleteOne({ _id: eventId });
    if (response.acknowledged) {
      res.status(202).json(response);
    } else {
      res.status(500).json(response.error || 'Error has occurred while deleting event');
    }
  };
module.exports = { getAll, createEvent, updateEvent, deleteEvent };
