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
 * @description This API Handler is used to delete user account
 * @param {*} req
 * @param {*} h
 */
const handler = async (req, h) => {
  const customerId = req.query.id
  const deleteCustomer = () => new Promise(async (resolve, reject) => {
    const filter = { _id: ObjectId(req.query.id) }
    const project = { projection: { FirstName: 1 } }
    const data = await customer.getCustomer(filter, project)
    if (data.length !== 0) {
      await customer.deleteCustomer(customerId)
      resolve(data)
    } else {
      reject({ message: req.i18n.__('deleteCustomer.404'), code: 404 })
    }
  })
  return deleteCustomer()
    .then(data => {
      return h.response({ message: req.i18n.__('deleteCustomer.200'), data }).code(200)
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
module.exports = { handler, responseValidate }
