'use strict'

const Joi = require('joi')
const elasticProduct = require('../../../library/elasticProducts')
const handler = async (req, res) => {
  let result
  try {
    result = await elasticProduct.addProduct(req.payload)
  } catch (error) {
    console.error(error)
  }
  return res.response({
    status: 'Your product added successfully! ',
    result
  })
}
const validator = {
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
  })
}
module.exports = {
  handler,
  validator
}
