'use strict'
const products = require('../../../models/products')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const handler = async (req, res) => {
  const productData = req.payload
  productData.customer_id = req.customer_id

  const product = await products.postProducts(productData)
  return res.response({
    status: 'You Product Inserted Successfully !',
    product
  })
}

const validateProduct = {
  payload: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .description('Name field is Required  for Products'),
    ram: Joi.string()
      .required()
      .description('RAM field is Required  for Products'),
    display_size: Joi.string()
      .required()
      .description('Display Size field is Required  for Products'),
    operating_system: Joi.string()
      .required()
      .description('Operating System field is Required  for Products')
    // customer_id: Joi.objectId()
    //   .required()
    //   .description("Customer Name field is Required  for Products"),
  })
}

module.exports = { handler, validateProduct }
