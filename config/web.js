const mongodb = require("./components/mongodb");
const server = require("./components/server");
const redis = require("./components/redis");

module.exports = Object.assign({}, mongodb, server, redis);
