const { Request } = require("../models");
const config = require("config");
const debug = require("debug")(`${config.app.tag}:postware`);

function safe(context) {
  if (context && typeof context === "object") {
    Object.keys(context).forEach(key => {
      if (/^pass(word)?$/.test(key) && typeof context[key] === "string") {
        context[key] = "*";
      } else if (typeof context[key] === "object") {
        context[key] = safe(context[key]);
      }
    });
  }

  return context;
}

module.exports = function(req, res, next) {
  const data = {
    remote: { ip: req.ip },
    req: {
      url: req.url,
      method: req.method
    },
    res: {},
    timestamp: new Date()
  };
  res.on("finish", () => {
    if (req.$member) {
      data.remote.memberId = req.$member.id;
      data.remote.groupId = req.$member.groupId;
      data.remote.email = req.$member.email;
    }
    if (req.route) {
      data.req.route = req.route.path;
    }
    if (req.params) {
      data.req.params = safe(req.params);
    }
    if (req.body) {
      data.req.body = safe(req.body);
    }
    if (req.query) {
      data.req.query = safe(req.query);
    }
    data.res.status = res.statusCode;
    data.timespan = new Date() - data.timestamp;
    Request.create(data).catch(err => debug(err));
  });
  next();
};
