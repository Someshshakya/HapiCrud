'use strict'
/**
 * @global
 */
const Joi = require('joi')
const { ObjectId } = require('mongodb')
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @namspace
 */
const customer = require('../../../../models/customer')
const { errorLogger } = require('../../../../utils/logger')
const i18n = require('../../../../locales/locales')

/**
 * @author Somesh Shakya
 * @description This API Handler allows user to get the custome details
 * @param {*} req
 * @param {*} h
 */
const handler = async (req, h) => {
  let params = {}
  if (req.query.id !== undefined && req.query.id !== 'null') {
    params = { _id: ObjectId(req.query.id) }
  }
  try {
    const result = await customer.getCustomer(params)
    if (result.length === 0) {
      return h.response({ message: req.i18n.__('common.response.404') }).code(404)
    }
    return h.response({ message: req.i18n.__('common.response.200'), result }).code(200)
  } catch (error) {
    errorLogger('--err---', error)
  }
}

const validateId = Joi.object({
  id: Joi.objectId().description('Customer Id')
})

const responseValidate = {
  status: {
    200: Joi.object({
      message: Joi.any()
        .example(i18n.__('common.response.200')),
      data: Joi.object({
        _id: Joi.objectId()
          .description('_id unique id for each user')
          .example('61caa96378e697fa2ee9df48'),
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
        password: Joi.string()
          .min(8)
          .max(16)
          .description('Password is required field for Customer!')
          .example('*********'),
        company: Joi.string()
          .required()
          .description('Comapany  field is Required  for Customers')
          .example('appscrip.co'),
        signUpType: Joi.number()
          .valid(1, 2, 3) // allow no longer exists on the latest release
          .required()
          .description('1. Normal Login 2. Google 3. Facebook')
          .example(1),
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
      })
    }).description(i18n.__('common.responseDescription.200')),
    404: Joi.object({
      message: Joi.any().example(i18n.__('common.response.404'))
    }).description(i18n.__('common.responseDescription.404'))
  },
  failAction: 'log'
}
module.exports = {
  handler,
  validateId,
  responseValidate
}
