const path = require("path");
const fs = require("fs");
const stringcase = require("stringcase");

/**
 * Import model defination
 */
module.exports = (db, dir) => {
  const models = {};
  fs
    .readdirSync(dir)
    .filter(f => /.js$/.test(f))
    .forEach(filename => {
      const file = path.join(dir, filename);
      const define = require(file);
      const name =
        define.name || path.basename(filename, path.extname(filename));
      const target = define.type
        .split(".")
        .reduce((obj, prop) => obj[prop], db);
      const model = target.define(
        stringcase.camelcase(name),
        define.schema,
        define.options
      );
      models[stringcase.pascalcase(name)] = model;
    });

  return models;
};
