'use strict'

/**
 * @global
 */

/**
 * @namespace
 */
const get = require('../get/get')
const del = require('./delete')
const headerValidator = require('../../../middleware/validator')
/**
  * A module that exports Customer API  routes to hapi server!
  * @exports customer
  */

module.exports = [
  /**
   * *api to delete Customers
   */
  {
    method: 'DELETE',
    path: '/customers/{id}',
    options: {
      validate: {
        query: get.validateId,
        headers: headerValidator.headerAuthValidator
      },
      description: 'To  detete the customer ',
      notes: 'Returns the status of customer, if deleted',
      tags: ['api', 'Customers'],
      /** @memberof response validator */
      response: del.responseValidate
    },
    /** @memberof postSignup validator */
    handler: del.handler
  }
]
