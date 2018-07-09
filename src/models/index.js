const sequelize = require("../database/sequelize");
const mongoose = require("../database/mongoose");
const path = require("path");

const models = require("./boot")(
  { sequelize, mongoose },
  path.join(__dirname, "./entities")
);
require("./relations")(models);
require("./hooks")(models);

module.exports = models;
