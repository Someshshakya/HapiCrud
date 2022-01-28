'use strict'

const Joi = require('joi')
const elasticProduct = require('../../../library/elasticProducts')
const handler = async (req, res) => {
  let result
  const id = req.params.id
  const updated_doc = req.payload
  try {
    result = await elasticProduct.updateProduct(id, updated_doc)
  } catch (error) {
    console.error(error)
  }
  return res.response({
    status: 'Your product updated successfully! ',
    result
  })
}

module.exports = { handler }
