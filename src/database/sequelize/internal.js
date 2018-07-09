const config = require("config");
const debug = require("debug")(`${config.app.tag}:sequelize.internal`);

module.exports = require("./boot")(config.db.sequelize.internal, debug);
