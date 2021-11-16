"use strict";
const redis = require("redis");
const { promisifyAll } = require("bluebird");
promisifyAll(redis);
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

client.on("connect", () => console.log("Redis connected Successfuly !"));
client.on("error", (error) => {
  console.error(error);
});

module.exports = client;
