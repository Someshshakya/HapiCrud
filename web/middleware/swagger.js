"use strict";
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const swaggerOptions = {
  info: {
    title: "Hapi Crud",
    version: "1.0.0",
  },
  grouping: "tags",
};

const Swagger = {
  plugin: HapiSwagger,
  options: swaggerOptions,
};

module.exports = { Inert, Vision, Swagger };
