const path = require("path");
const fs = require("fs");
const config = require("config");
const debug = require("debug")(`${config.app.tag}:router`);
const Router = require("express").Router;

/**
 * Import controllers
 */
module.exports = dir => {
  const router = Router();

  fs
    .readdirSync(dir)
    .filter(f => /.js$/.test(f))
    .forEach(name => {
      const file = path.join(dir, name);
      const controller = require(file);
      if (typeof controller !== "object") return;
      const location = (controller.name ||
        path.basename(file, path.extname(file)))
        .toLowerCase();

      Object.keys(controller).forEach(key => {
        let method, url, handler, middlewares;
        if (typeof controller[key] === "function") {
          switch (key) {
            case "get":
            case "put":
            case "post":
            case "delete":
              method = key;
              url = `/${location}`;
              break;
            default:
              return;
          }
          handler = controller[key];
        } else if (
          typeof controller[key] === "object" &&
          typeof controller[key].method === "string" &&
          typeof controller[key].handler === "function"
        ) {
          method = controller[key].method.toLowerCase();
          handler = controller[key].handler;
          url = `/${location}/${controller[key].name || key}`
            .replace(/\/{2,}/g, "/")
            .replace(/\/$/, "")
            .toLowerCase();
          middlewares = controller[key].middlewares;
        } else {
          return;
        }
        if (Array.isArray(controller.middlewares)) {
          if (Array.isArray(middlewares)) {
            middlewares = controller.middlewares.concat(middlewares);
          } else {
            middlewares = controller.middlewares;
          }
        }
        if (Array.isArray(middlewares)) {
          router[method](url, ...middlewares, handler);
        } else {
          router[method](url, handler);
        }
        debug(`mounted route ${method.toUpperCase()} ${url}`);
      });
    });

  return router;
};
