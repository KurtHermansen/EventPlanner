const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongodb.getDb().db('event-planner').collection('events').find();
        result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
        });

    } catch (err) {
        res.status(500).json(response.error || 'Error occurred while gathering information');
    }

};

const createEvent = async (req, res) => {
    try {
        if (!req.body.time || !req.body.date || !req.body.venueID || !req.body.ageGroup || !req.body.food || !req.body.sponsor || !req.body.theme  || !req.body.cause || !req.body.eventPlanner){
            res.status(400).send({ message: 'Content can not be empty!' });
            return;
        }
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
  }
} catch (err) {
    res.status(500).json(response.error || 'Error occurred while creating event');
}
};


const updateEvent = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid event id to find a event.');
          } else if (!req.body.time || !req.body.date || !req.body.venueID || !req.body.ageGroup || !req.body.food || !req.body.sponsor || !req.body.theme  || !req.body.cause || !req.body.eventPlanner){
            res.status(400).send({ message: 'Content can not be empty!' });
            return;
        }
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
    }
} catch (err) {
    res.status(500).json(response.error || 'Error occurred while updating event');
}
  };


  const deleteEvent = async (req, res) => {
      try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid event id to delete a event.');
          }
    const eventId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('event-planner')
      .collection('events')
      .deleteOne({ _id: eventId });
    if (response.acknowledged) {
      res.status(202).json(response);
    }
} catch (err) {
    res.status(500).json(response.error || 'Error occurred while deleting event');
}
  };
module.exports = { getAll, createEvent, updateEvent, deleteEvent };
