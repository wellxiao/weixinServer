const Promise = require("bluebird");
const internal = require("./internal");
const external = require("./external");

module.exports = {
  internal,
  external,
  up() {
    return Promise.all([internal.authenticate(), external.authenticate()]);
  },
  down() {
    return Promise.all([internal.close(), external.close()]);
  }
};
