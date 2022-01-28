'use strict'
const products = require('../../../models/products')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const handler = async (req, res) => {
  const token = req.headers.authorization // recieving token from the headers
  const productDetails = {}
  if (req.query.id) {
    productDetails.id = req.query.id
  }
  productDetails.customer_id = req.customer_id

  // prettier-ignore
  const product = await products.getProducts(productDetails) // XXX X X X X XXX
  const response = res.response({
    status: 'Here is the List of Products',
    product
  })
  response.header('Authorization', token) // set the token in the header
  return response
}

const validateCustomerId = Joi.object({
  customer_id: Joi.objectId().required()
})

const validateId = Joi.object({
  id: Joi.objectId().required()
})

module.exports = {
  handler,
  validateCustomerId,
  validateId
}
