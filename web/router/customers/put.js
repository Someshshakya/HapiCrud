'use strict'
const customer = require('../../../models/customer')
const { ObjectId } = require('mongodb')
const { errorLogger } = require('../../../utils/logger')
const Joi = require('joi')
const i18n = require('../../../locales/locales')

const handler = async (req, h) => {
  const updatedData = () => new Promise(async(resolve, reject) => {
    await customer.updateCustomer(req.query.id, req.payload) // pasing customer id and the data to be updated
    const filter = { _id: ObjectId(req.query.id) }
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

const responseValidate = {
  status: {
    500: Joi.object({
      message: Joi.any().example(i18n.__('common.response.500'))
    }).description(i18n.__('common.responseDescription.500')),
    200: Joi.object({
      message: Joi.any().example(i18n.__('updateCusomter.200')),
      data: Joi.object({
        _id: '5dfcd86c2ffb45bc6b593cac',
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
    }).description(i18n.__('common.responseDescription.200'))
  },
  failAction: 'log'
}
module.exports = { handler, responseValidate }
