'use strict'
const products = require('../../../models/products')

const handler = async (req, res) => {
  const productData = req.params
  productData.customer_id = req.customer_id
  const product = await products.deleteProduct(productData)
  return updatedDate()
  .then(data => {
    return h.response({ message: req.i18n.__('updateCusomter.200'), data }).code(200)
  })
  .catch(err => {
    if (err instanceof Error) {
      errorLogger('--err---', err)
      return h.response({ message: req.i18n.__('common.response.500') }).code(500)
    } else {
      return h.response({ message: err.message }).code(err.code)
    }
  })
  return res.response({
    status: 'Your Product Deleted Successfully !',
    product
  })
}

module.exports = { handler }
