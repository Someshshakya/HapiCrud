'use strict'
const db = require('../../library/mongodb')
const collectionName = 'customer'
const { ObjectId } = require('mongodb')
const postCustomer = async (data) => {
  const result = await db.get().collection(collectionName).insertOne(data)
  return result
}

const getCustomer = async (id) => {
  let customers
  const collection = await db.get().collection(collectionName)
  if (id != undefined) {
    const query = { _id: ObjectId(id) }
    customers = await collection.findOne(query)
  } else {
    customers = await collection.find({}).toArray() // to get the all Customers
  }
  return customers
}

const deleteCustomer = async (id) => {
  const query = { _id: ObjectId(id) }
  const result = await db.get().collection(collectionName).deleteOne(query)
  return result
}

const updateCustomer = async (id, data) => {
  const query = { _id: ObjectId(id) }
  const update_doc = {
    $set: data
  }
  const options = { upsert: false }
  const result = await db
    .get()
    .collection(collectionName)
    .updateOne(query, update_doc, options)
  return result
}

const loginCustomer = async (email) => {
  const query = { email }
  const projection = { password: 0 }
  if (email != undefined) {
    const result = await db
      .get()
      .collection(collectionName)
      .findOne(query, projection)

    return result
  }
}
module.exports = {
  postCustomer,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  loginCustomer
}
