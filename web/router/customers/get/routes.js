'use strict'

/**
 * @global
 */

/**
 * @namespace
 */
const headerValidator = require('../../../middleware/validator')
const get = require('./get')

/**
 * A module that exports Customer API  routes to hapi server!
 * @exports customer
 */
module.exports = [
  /**
   * *api to get Customers
   */
  {
    method: 'GET',
    path: '/customers/{id?}',
    options: {
      validate: {
        /** @memberof header validator */
        headers: headerValidator.headerAuthValidator,
        /** @memberof query validator */
        query: get.validateId
      },
      description: 'To  get all the customer if customerId  is not defined',
      notes: 'Returns the Array of customer, if found',
      tags: ['api', 'Customers'],
      /** @memberof postSignup validator */
      handler: get.handler,
      response: get.responseValidate // response for swagger
    }
  }

]
