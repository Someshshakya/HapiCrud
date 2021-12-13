'use strict'
const Joi = require('joi')
const elasticProduct = require('../../../library/elasticProducts')
const handler = async (req, res) => {
  let result = null
  const id = req.params.id
  try {
    result = await elasticProduct.getProduct(id)
  } catch (error) {
    console.error(error)
  }
  return res.response({
    status: 'Your product fetched successfully! ',
    result
  })
}

const pramsIdValidator = {
  params: Joi.object({
    id: Joi.string().required()
  })
}
module.exports = {
  handler,
  pramsIdValidator
}
