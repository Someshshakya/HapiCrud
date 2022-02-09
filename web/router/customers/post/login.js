'use strict'
/**
 * @global
 */
const Joi = require('joi')
const bcrypt = require('bcrypt')

/**
 * @namspace
 */
const customer = require('../../../../models/customer')
const { auth: jwt } = require('../../../middleware')
const i18n = require('../../../../locales/locales')

/**
 * @function
 * @name verifyPassword
 * @param {*} plainPassword
 * @param {*} hashPassword
 * @returns brcpted password
 */
const verifyPassword = (plainPassword, hashPassword) => {
  return bcrypt.compare(plainPassword, hashPassword)
}
/**
 * @author Somesh Shakya
 * @description This API Handler allows user Sign up a new account
 * @param {*} req
 * @param {*} h
 */

const handler = async (req, res) => {
  try {
    let status
    const customerData = req.payload
    // get the plain password from body
    const { email, password } = customerData
    const data = await customer.loginCustomer(email)
    // get hassPassword from db
    const { password: hashPassword, _id: customerId } = data
    const isCorrect = await verifyPassword(password, hashPassword)
    if (isCorrect) {
      // create jwt (Json Web Token)
      const token = jwt.genreateJWT(customerId)
      status = { message: 'You logged in Successfully!', token }
    } else {
      // password or Username is Incorrect!
      status = 'You username or password is Incorrect'
    }
    return res.response({ status })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @object for response validation
 */
const validateCustomer = Joi.object({
  email: Joi.string()
    .min(3)
    .required()
    .email()
    .description('Email field is Required  for Customers'),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .description('Password is required field for Customer!')
}).label('Login Customer Ppayload')
/**
 * respnonse validate
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

module.exports = {
  handler,
  validateCustomer,
  responseValidate
}
