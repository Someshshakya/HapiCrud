'use strict'
/**
 * @global
 */
const Joi = require('joi')
const bcrypt = require('bcrypt')

/**
 * @namespace
 */
// const i18n = require('../../../locales/locales') // no  use here
const customer = require('../../../models/customer')
const saltrounds = 10

const handler = async (req, h) => {
  if (parseInt(req.payload.signUpType) === 1) {
    if (req.payload.userName === null || req.payload.userName === undefined) {
      return h.response({ message: req.i18n.__('signUp.402') }).code(402)
    }
    if (req.payload.email === null || req.payload.email === undefined) {
      return h.response({ message: req.i18n.__('signUp.410') }).code(410)
    }
    if (req.payload.password === null || req.payload.password === undefined) {
      return h.response({ message: req.i18n.__('signUp.414') }).code(414)
    }
    req.payload.password = await bcrypt.hash(req.payload.password, saltrounds)
    const signUpData = {
      userName: req.payload.userName ? req.payload.userName : '',
      FirstName: req.payload.FirstName ? req.payload.FirstName : '',
      email: req.payload.email ? req.payload.email : '',
      mobile: req.payload.mobile ? req.payload.mobile : '',
      password: req.payload.password,
      company: req.payload.company,
      signUpType: req.payload.signUpType,
      city: req.payload.city ? req.payload.city : '',
      state: req.payload.state ? req.payload.state : '',
      country: req.payload.country,
      countryCode: req.payload.countryCode ? req.payload.countryCode : '',
      createdDate: new Date()
    }
    await customer.postCustomer(signUpData)
    return h.response({ message: req.i18n.__('signUp.413') }).code(200)
    // return h.response({ message: 'success' })
  } else {
    return h.response({ message: req.i18n.__('signUp.403') }).code(200)
  }
}

const validateCustomer = Joi.object({
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

}).label('Customer Payload')

module.exports = { handler, validateCustomer }
