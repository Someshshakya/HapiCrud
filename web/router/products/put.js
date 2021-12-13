'use strict'
const products = require('../../../models/products')

const handler = async (req, res) => {
  const productId = req.params.id
  const data = req.payload
  data.customer_id = req.customer_id

  const product = await products.updateProduct(productId, data)
  return res.response({
    status: 'Your Product Modified  Successfully !',
    product
  })
}

module.exports = { handler }
