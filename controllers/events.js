const db = require('../models')
const Event = db.events;
const ObjectId = require('mongodb').ObjectId;

module.exports.getAll = (req, res) => {
    try {
      Event.find({})
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Events.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };



  module.exports.createEvent = (req, res) => {
    try {
      if (!req.body.time ||
        !req.body.date ||
        !req.body.venueID ||
        !req.body.ageGroup ||
        !req.body.food ||
        !req.body.sponsor ||
        !req.body.theme ||
        !req.body.cause ||
        !req.body.eventPlanner) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const event = new Event(req.body);
      event
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the event.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  module.exports.updateEvent = async (req, res) => {
    try {
         if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid event id to find a event.');
            return;
        } else if (!req.body.time ||
            !req.body.date ||
            !req.body.venueID ||
            !req.body.ageGroup ||
            !req.body.food ||
            !req.body.sponsor ||
            !req.body.theme ||
            !req.body.cause ||
            !req.body.eventPlanner) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const eventId = new ObjectId(req.params.id);
      Event.findOne({ _id: eventId }, function (err, event) {
          event.time = req.body.time;
          event.date = req.body.date;
          event.venueID = req.body.venueID;
          event.ageGroup = req.body.ageGroup;
          event.food = req.body.food;
          event.sponsor = req.body.sponsor;
          event.theme = req.body.theme;
          event.cause = req.body.cause;
          event.eventPlanner = req.body.eventPlanner;
          event.save(function (err) {
              if (err)  {
                  res.status(500).json(err || 'Some Error occurred while updating the Venue');
              } else {
                  res.status(204).send(event);
              }
          });
      });
    } catch (err) {
        res.status(500).json(err);
    }
  };


  module.exports.deleteEvent = async (req, res) => {
    try {
         if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid event id to find a event.');
            return;
        }
        const eventId = new ObjectId(req.params.id);
        Event.deleteOne({ _id: eventId }, function (err, result) {
            if (err) {
                res.status(500).json(err || 'Some error occurred while deleting the event');
            } else {
                res.status(204).send(result);
            }
        });
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the event.');
    }
};
