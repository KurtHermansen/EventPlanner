const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.events = require('./events.js')(mongoose);
db.venues = require('./venues')(mongoose);

module.exports = db;
