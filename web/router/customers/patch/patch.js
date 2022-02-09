'use strict'
/**
 * @global
 */
const Joi = require('joi')
const { ObjectId } = require('mongodb')

/**
 * @namespace
 */
const customer = require('../../../../models/customer')
const { errorLogger } = require('../../../../utils/logger')
const i18n = require('../../../../locales/locales')

/**
 * @author Somesh Shakya
 * @description This API Handler allows user to update thier detalis
 * @param {*} req
 * @param {*} h
 */
const handler = async (req, h) => {
  const updatedData = () => new Promise(async (resolve, reject) => {
    let customerToUpdate = {}
    customerToUpdate.userName = req.payload.userName ? req.payload.userName : undefined
    customerToUpdate.email = req.payload.email ? req.payload.email : undefined
    customerToUpdate.mobile = req.payload.mobile ? req.payload.mobile : undefined
    customerToUpdate.company = req.payload.company ? req.payload.company : undefined
    customerToUpdate.city = req.payload.city ? req.payload.city : undefined
    customerToUpdate.state = req.payload.state ? req.payload.state : undefined
    customerToUpdate.country = req.payload.country ? req.payload.country : undefined
    customerToUpdate.countryCode = req.payload.countryCode ? req.payload.countryCode : undefined
    customerToUpdate = JSON.parse(JSON.stringify(customerToUpdate))
    console.log('these are the details need to be udpated ', customerToUpdate)

    await customer.updateCustomer(req.payload.customerId, customerToUpdate) // pasing customer id and the data to be updated
    const filter = { _id: ObjectId(req.payload.customerId) }
    const project = { projection: { password: 0 } }
    const data = await customer.getCustomer(filter, project)
    if (data) {
      resolve(data)
    } else {
      reject({ message: req.i18n.__('common.response.404'), code: 404 })
    }
  })
  return updatedData()
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
}

/** @payload validation */
const validateCustomer = Joi.object({
  customerId: Joi.string()
    .example('61a5b567971dd30c425483e8')
    .description('customer id to be udpated '),
  userName: Joi.string()
    .description('UserName field is Required  for Customers')
    .example('someshshakya'),
  FirstName: Joi.string()
    .description('First Name field is Required  for Customers')
    .example('Somesh'),
  email: Joi.string()
    .email()
    .description('Email field is Required  for Customers')
    .example('somesh@gmail.com'),
  mobile: Joi.number()
    .integer()
    .description('Mobile field is Required  for Customers')
    .example('8238242217'),
  company: Joi.string()
    .description('Comapany  field is Required  for Customers')
    .example('appscrip.co'),
  city: Joi.string()
    .optional('')
    .example('delhi')
    .description('city is required'),
  state: Joi.string()
    .optional('')
    .example('Gujrat')
    .description('state is required'),
  country: Joi.string()
    .optional()
    .example('India')
    .description('Country is required'),
  countryCode: Joi.string()
    .example('+91')
    .description('Country Code is required when signUpType is 1')
    .when('signUpType', {
      is: 1,
      then: Joi.required()
    })
}).label('Customer Edit Payload ')

/**
 * respnonse @validate
 */
const responseValidate = {
  status: {
    500: Joi.object({
      message: Joi.any().example(i18n.__('signUp.500'))
    }).description(i18n.__('common.responseDescription.500')),
    200: Joi.object({
      message: Joi.any().example(i18n.__('signUp.200'))
    }).description(i18n.__('common.responseDescription.200')),
    404: Joi.object({
      message: Joi.any().example(i18n.__('signUp.404'))
    }).description(i18n.__('common.responseDescription.404'))

  },
  failAction: 'log'
}

module.exports = { handler, responseValidate, validateCustomer }
