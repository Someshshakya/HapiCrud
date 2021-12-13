'use strict'

const elasticProduct = require('../../../library/elasticProducts')
const handler = async (req, res) => {
  let result = null
  const id = req.params.id
  try {
    result = await elasticProduct.deleteProduct(id)
  } catch (error) {
    console.error(error)
  }
  return res.response({
    status: 'Your product Deleted successfully! ',
    result
  })
}

module.exports = {
  handler
}
