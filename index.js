const Promise = require("bluebird");
const config = require("config");
const debug = require("debug")(`${config.app.tag}:app`);

/**
 * db connection establishing
 *
 */
async function establish() {
  const sequelize = require("./src/database/sequelize");
  await sequelize.up();
  // const mongoose = require("./src/database/mongoose");
  // await mongoose.up();
  debug("db connection established successfully");
  if (process.env.NODE_ENV !== "production" && process.env.SYNC_AT_START) {
    require("./src/models");
    await require("./src/database/sequelize/internal").sync();
    debug("tables synced successfully");
  }
}
/**
 * listen on provided port, on all network interfaces.
 *
 * @returns {Promise<Server>}
 */
async function listen() {
  const app = require("./src");
  const server = await new Promise((resolve, reject) => {
    const http = require("http");
    const server = http.createServer(app);
    server.on("error", err => {
      if (err.syscall !== "listen") {
        return reject(err);
      }

      const bind =
        typeof config.app.port === "string"
          ? "Pipe " + config.app.port
          : "Port " + config.app.port;

      // handle specific listen errors with friendly messages
      switch (err.code) {
        case "EACCES":
          debug(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          debug(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          return reject(err);
      }
    });
    server.on("listening", () => {
      const addr = server.address();
      const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
      debug("Listening on " + bind);
      resolve(server);
    });
    server.listen(config.app.port, config.app.host);
  });
  app.set("port", config.app.port);
  app.set("host", config.app.host);

  return server;
}
async function websocket(){
  await require('./src/websocket/index')();
}

module.exports = (async () => {
  try {
    await establish();
    await websocket();
    return await listen();
  } catch (err) {
    debug(err);
    process.exit(1);
  }
})();
