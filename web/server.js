"use strict";
const Hapi = require("@hapi/hapi");
const config = require("../config");
const port = config.server.port || 8000;
const server = new Hapi.Server({ port, host: "localhost" });
const db = require("../models/monogodb").connect(); // create connection to mongodb
const middleware = require("../web/middleware");
const redis = require("../models/redis"); // connect redis
const elasticSearch = require("../models/elasticSearch");

const initilize = async () => {
  await server.register([
    middleware.swagger.Swagger,
    middleware.swagger.Inert,
    middleware.swagger.Vision,
  ]);
  // connect the routes with the server;
  server.route(require("./router"));
  await server.start();
  console.log(`Server running on %s ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
module.exports = { initilize };
