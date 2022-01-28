'use strict'
const config = require('../../config')
const { url, dbName } = config.mongodb
// console.log("db -> ",url, dbName)

const { MongoClient } = require('mongodb')

const state = { db: null }
let client

// Connect to the db
exports.connect = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`Mongodb successfully connected to  :-  \n -  - -->  ${url}`)
    state.db = client.db(dbName)
  } catch (error) {
    console.error(` ------ mongodb could not connect ----- ${url}`)
    process.exit(0)
  }
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => state.db

// to close the mongodb connection
exports.close = async () => {
  await client.close()
}
