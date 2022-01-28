'use strict'
const db = require('../../library/mongodb')
const collectionName = 'customer'
const { ObjectId } = require('mongodb')
const postCustomer = (data) => {
  return db.get().collection(collectionName).insertOne(data)
}

const getCustomer = (params, proj) => {
  return db.get().collection(collectionName).find(params || {}, proj || {}).toArray() // to get the all Customers
}

const deleteCustomer = async (id) => {
  const query = { _id: ObjectId(id) }
  const result = await db.get().collection(collectionName).deleteOne(query)
  return result
}

const updateCustomer = (id, data) => {
  const query = { _id: ObjectId(id) }
  const updateDoc = {
    $set: data
  }
  const options = { upsert: false }
  const result = db
    .get()
    .collection(collectionName)
    .updateOne(query, updateDoc, options)
  return result
}

const loginCustomer = async (email) => {
  const query = { email }
  const projection = { password: 0 }
  if (email !== undefined) {
    const result = await db
      .get()
      .collection(collectionName)
      .findOne(query, projection)

    return result
  }
}
const getCustomers = (condition, project) => {
  return db.get().collection(collectionName).find(condition || {}, project || {}).toArray()
}
module.exports = {
  postCustomer,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  loginCustomer,
  getCustomers
}
