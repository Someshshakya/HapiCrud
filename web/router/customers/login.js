'use strict'
const customer = require('../../../models/customer')
const { auth: jwt } = require('../../middleware')
const Joi = require('joi')
const bcrypt = require('bcrypt')

// hass the password
const verifyPassword = (plainPassword, hashPassword) => {
  return bcrypt.compare(plainPassword, hashPassword)
}

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

const validateCustomer = {
  payload: Joi.object({
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
  })
}

module.exports = { handler, validateCustomer }
