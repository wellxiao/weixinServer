const config = require('config');
const debug = require('debug')(`${config.app.tag}:sequelize.external`);

module.exports = require('./boot')(config.db.sequelize.external, debug);
