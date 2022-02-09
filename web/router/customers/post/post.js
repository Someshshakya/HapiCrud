'use strict'
/**
 * @global
 */
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

/**
 * @namespace
 */
const { errorLogger } = require('../../../../utils/logger')
const customer = require('../../../../models/customer')
const i18n = require('../../../../locales/locales')
const saltrounds = 10
/**
 * @author Somesh Shakya
 * @description This API allows user Sign up a new account
 * @param {*} req
 * @param {*} h
 */
const handler = async (req, h) => {
  const checkUser = () => new Promise(async (resolve, reject) => {
    if (parseInt(req.payload.signUpType) === 1) {
      if (req.payload.userName === null || req.payload.userName === undefined) {
        return h.response({ message: req.i18n.__('signUp.402') }).code(402)
      } else if (req.payload.email === null || req.payload.email === undefined) {
        return h.response({ message: req.i18n.__('signUp.410') }).code(410)
      } else if (req.payload.password === null || req.payload.password === undefined) {
        return h.response({ message: req.i18n.__('signUp.414') }).code(414)
      }
      const signUpData = {
        userName: req.payload.userName ? req.payload.userName : '',
        FirstName: req.payload.FirstName ? req.payload.FirstName : '',
        email: req.payload.email ? req.payload.email : '',
        mobile: req.payload.mobile ? req.payload.mobile : '',
        password: await bcrypt.hash(req.payload.password, saltrounds),
        company: req.payload.company,
        signUpType: req.payload.signUpType,
        city: req.payload.city ? req.payload.city : '',
        state: req.payload.state ? req.payload.state : '',
        country: req.payload.country,
        countryCode: req.payload.countryCode ? req.payload.countryCode : '',
        orignalPassword: req.payload.password,
        createdDate: new Date()
      }
      const condition = { email: req.payload.email }
      const customers = await customer.getCustomers(condition, { email: 1 })
      if (customers.length === 0) {
        resolve(signUpData)
      } else {
        reject(({ message: req.i18n.__('signUp.409'), code: 409 }))
      }
    } else if (parseInt(req.payload.signUpType) === 2 || parseInt(req.payload.signUpType) === 3) {
      reject({ message: req.i18n.__('signUp.403'), code: 403 })
    }
  })
  return checkUser()
    .then(async (dataToInsert) => {
      const data = await customer.postCustomer(dataToInsert)
      const filter = { _id: ObjectId(data.insertedId) }
      const project = { projection: { password: 0 } }
      const customerData = await customer.getCustomer(filter, project)
      return h.response({ message: req.i18n.__('signUp.200'), data: customerData }).code(200)
    })
    .catch((err) => {
      if (err instanceof Error) {
        errorLogger('---err---', err)
        return h.response({ message: req.i18n.__('signUp.500') }).code(500)
      } else {
        return h.response({ message: err.message }).code(err.code)
      }
    })
}

const responseValidate = {
  status: {
    500: Joi.object({
      message: Joi.any().example(i18n.__('signUp.500'))
    }).description(i18n.__('common.responseDescription.500')),
    200: Joi.object({
      message: Joi.any().example(i18n.__('signUp.200')),
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
      }),
      createdDate: '2021-12-28T13:05:25.534Z'
    }).description(i18n.__('common.responseDescription.200')),
    414: Joi.object({
      message: Joi.any().example(i18n.__('signUp.414'))
    }).description(i18n.__('common.responseDescription.414')),
    410: Joi.object({
      message: Joi.any().example(i18n.__('signUp.410'))
    }).description(i18n.__('common.responseDescription.410')),
    409: Joi.object({
      message: Joi.any().example(i18n.__('signUp.409'))
    }).description(i18n.__('common.responseDescription.409')),
    402: Joi.object({
      message: Joi.any().example(i18n.__('signUp.402'))
    }).description(i18n.__('common.responseDescription.402')),
    403: Joi.object({
      message: Joi.any().example(i18n.__('signUp.403'))
    }).description(i18n.__('common.responseDescription.403'))

  },
  failAction: 'log'
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
}).label('Customer Sign Up Payload ')

module.exports = { handler, validateCustomer, responseValidate }
