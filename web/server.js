"use strict";
const Hapi = require("@hapi/hapi");
const server = new Hapi.Server({ port: 8000, host: "localhost" });
const db = require("../models/monogodb").connect(); // create connection to mongodb
const initilize = async () => {
  // connect the routes with the server;
  await server.route(require("./router"));
  await server.start();
  console.log(`Server running on %s ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
module.exports = { initilize };
