'use strict'
const products = require('../../../models/products')

const handler = async (req, res) => {
  const productData = req.params
  productData.customer_id = req.customer_id
  const product = await products.deleteProduct(productData)
  return res.response({
    status: 'Your Product Deleted Successfully !',
    product
  })
}

module.exports = { handler }
