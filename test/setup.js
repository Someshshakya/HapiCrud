require('dotenv').config({ path: '.env.test' })
const mongodb = require('../library/mongodb')
const db = require('../library/mongodb')
const stub = require('./stubFolder/customer')
// const models = require('../models/createIndex')

module.exports = async () => {
  await mongodb.connect()
  const client = mongodb.get()

  const collectionList = await client.listCollections({}, { nameOnly: true }).toArray()
  const collectionListMap = collectionList.map(async (item) => {
    await client.dropCollection(item.name)
  })

  Promise.all(collectionListMap)
    .then(async () => {
      await db.get().collection('customer').insertMany([stub.customer200])
    })
}
