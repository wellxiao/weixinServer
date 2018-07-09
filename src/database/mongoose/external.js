const config = require('config');

module.exports = require('./boot')(config.db.mongo.internal);
