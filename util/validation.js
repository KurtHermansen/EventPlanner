const validator = require('./helper');

const venueCheck = (req, res, next) => {
  const validationRule = {
    address: 'required|string',
    locationName: 'required|string',
    capacity: 'required|integer',
    indoor: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const eventCheck = (req, res, next) => {
  const validationRule = {
    time: 'required|string',
    date: 'required|string',
    venueID: 'required|string',
    ageGroup: 'required|string',
    food: 'required|string',
    sponsor: 'required|string',
    theme: 'required|string',
    cause: 'required|string',
    eventPlanner: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  venueCheck,
  eventCheck
};
