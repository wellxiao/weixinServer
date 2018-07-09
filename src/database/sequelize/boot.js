const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const moment = require("moment");
const config = require("config");
const debug = require("debug")(`${config.app.tag}:app`);

const timezone =
  process.env.TZ ||
  (() => {
    let offset = moment().utcOffset();
    const rel = offset > 0 ? "+" : "-";
    offset = Math.abs(offset);
    const hour = Math.floor(offset / 60);
    const min = offset - hour * 60;

    return rel + `0${hour}`.slice(-2) + ":" + `0${min}`.slice(-2);
  })();

module.exports = (config, debug) => {
  const opts = Object.assign({}, config);
  if (opts.dialect === "sqlite") {
    if (!opts.storage || opts.storage === ":memory:") {
      opts.storage = ":memory:";
    } else {
      opts.storage = path.join(__dirname, "../../../", opts.storage);
      if (!fs.existsSync(opts.storage)) {
        fs.closeSync(fs.openSync(opts.storage, "w"));
      }
    }
  }
  if (opts.logging === true) {
    opts.logging = msg => debug("%s", msg);
  } else {
    opts.logging = false;
  }
  debug(timezone);
  debug(opts);
  return new Sequelize(Object.assign({ timezone }, opts));
};
