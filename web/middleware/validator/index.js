'use strict'
const { debugLogger, errorLogger } = require('../../../utils/logger')
const Joi = require('joi')

/**
 * validate request header with auth and other params
 */
const headerAuthValidator = Joi.object({
  authorization: Joi.string()
    .description('authorization'),
  language: Joi.string()
    .default('en')
    .description('language')
}).unknown()

const customError = (req, h, err) => {
  if (err.isJoi || Array.isArray(err.details)) {
    debugLogger.debug('req.headers : ', req.headers)
    debugLogger.debug('req.payload : ', req.payload)
    debugLogger.debug('req.query : ', req.query)
    debugLogger.debug('JOI error : ', err.details[0])
    const invalidItem = err.details[0]
    return h.response({
      message: req.i18n.__('common.response.400', invalidItem.path.join(','))
    }).code(400).takeover()
  }
  errorLogger.error('Other Error : ', err)
  return h.response({
    message: req.i18n.__('common.response.500')
  }).code(500).takeover()
}
module.exports = { headerAuthValidator, customError }
