'use strict'
const client = require('../../../models/redis')
const handler = async (req, res) => {
  try {
    let result
    const productData = JSON.stringify(req.payload)
    result = await client.getAsync('product')
    result = JSON.parse(result)
    return res.response({
      status: 'Here is your cached product!',
      result
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  handler
}
