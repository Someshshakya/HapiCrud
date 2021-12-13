'use strict'

const Joi = require('joi')
const client = require('../../../models/redis')
const handler = async (req, res) => {
  const productData = JSON.stringify(req.payload)
  let result
  try {
    result = await client.setAsync('product', productData)
  } catch (error) {
    console.error(error)
  }
  return res.response({
    status: `Your product added successfully! ${result}`
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
