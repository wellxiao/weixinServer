const Mongoose = require("mongoose").Mongoose;
const Promise = require("bluebird");

module.exports = opts => {
  const mongoose = new Mongoose();
  mongoose.Promise = Promise;

  const uri = `mongodb://${opts.host}:${opts.port}/${opts.database}`;
  opts = Object.assign({}, opts);
  delete opts.host;
  delete opts.port;
  delete opts.database;

  return {
    mongoose,

    define(...args) {
      return mongoose.model(...args);
    },

    up() {
      return mongoose.connect(uri, opts);
    },

    down() {
      return mongoose.disconnect();
    }
  };
};
