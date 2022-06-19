const db = require('../models')
const Venue = db.venues;
const ObjectId = require('mongodb').ObjectId;

module.exports.getAll = (req, res) => {
    try {
      Venue.find({})
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Venues.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  module.exports.createVenue = (req, res) => {
    try {
      if (!req.body.address ||
          !req.body.locationName ||
          !req.body.capacity ||
          !req.body.indoor) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const venue = new Venue(req.body);
      venue
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the venue.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };


  module.exports.updateVenue = async (req, res) => {
    try {
         if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid venue id to find a venue.');
            return;
        } else if (!req.body.address ||
          !req.body.locationName ||
          !req.body.capacity ||
          !req.body.indoor) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const venueId = new ObjectId(req.params.id);
      Venue.findOne({ _id: venueId }, function (err, venue) {
          venue.address = req.body.address;
          venue.locationName = req.body.locationName;
          venue.capacity = req.body.capacity;
          venue.indoor = req.body.indoor;
          venue.save(function (err) {
              if (err)  {
                  res.status(500).json(err || 'Some Error occurred while updating the Venue');
              } else {
                  res.status(204).send(venue);
              }
          });
      });
    } catch (err) {
        res.status(500).json(err);
    }
  };

  module.exports.deleteVenue = async (req, res) => {
    try {
         if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid venue id to find a venue.');
            return;
        }
        const venueId = new ObjectId(req.params.id);
        Venue.deleteOne({ _id: venueId }, function (err, result) {
            if (err) {
                res.status(500).json(err || 'Some error occurred while deleting the Venue');
            } else {
                res.status(204).send(result);
            }
        });
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the Venue.');
    }
};
