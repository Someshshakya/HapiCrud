///! This program will execute when all the test case are finish 
//* to clear the collection from the databases
const mongodb = require('../library/mongodb')

module.exports = async () => {
  await mongodb.connect()
  await mongodb.connect()
  const client = mongodb.get()
  const collectionList = await client.listCollections({}, { nameOnly: true }).toArray()

  const collectionListMap = collectionList.map(async (item) => {
    await client.dropCollection(item.name)
  })

  Promise.all(collectionListMap)
    .then(async () => {
      await mongodb.close()
    })
}
