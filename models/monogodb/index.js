"use strict";
const config = require("../../config");
const url = config.mongodb.url;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(url);
let state = { db: null };

// Connect to the db
exports.connect = async () => {
  try {
    state.db = await client.connect();
    console.log(`Mongodb successfully connected to  :-  \n -  - -->  ${url}`);
    state.db = client.db("somesh");
  } catch (error) {
    console.error(`mongodb could not connect ${url}`);
    process.exit(0);
  }
};

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => state.db;

// to close the mongodb connection
exports.close = async () => {
  if (state.db) await state.db.close();
};
