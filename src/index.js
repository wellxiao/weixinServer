require("./bootstrap");

const express = require("express");
const config = require("config");
const debug = require("debug")(`${config.app.tag}:app`);
// const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
// const postware = require('./routes/postware');

const app = express();

/**
 * body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * cookie parser
 */
// app.use(cookieParser());

/**
 * static files
 */
if (config.app.static) {
  app.use(express.static(path.join(__dirname, "..", config.app.static)));
}

/**
 * postware
 */
// if (config.app.postware) {
//   app.use(postware);
// }

/**
 * routes
 */
app.use("/api/v1", routes);

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/**
 * error handler
 */
/* eslint no-unused-vars: off */
app.use((err, req, res, next) => {
  // set http status
  res.status(err.status || 500);

  // send error
  res.json({
    error: err.status || 500,
    message: err.message
  });

  // bypass 4xx errors
  if (!err.status || !/^4[0-9]{2}/.test(err.status)) debug(err);
});

module.exports = app;
