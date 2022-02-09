'use strict'
'use strict'

/**
 * @global
 */

/**
 * @namespace
 */
const patch = require('./patch')
const headerValidator = require('../../../middleware/validator')
/**
 * A module that exports Customer API  routes to hapi server!
 * @exports customer
 */
module.exports = [
  /**
   * *api to update
   */
  {
    method: 'PATCH',
    path: '/customers/{id}',
    options: {
      validate: {
        /** @memberof header validator */
        headers: headerValidator.headerAuthValidator,
        /** @memberof query validator */
        /** @memberof paylaod validator */
        payload: patch.validateCustomer
      },
      handler: patch.handler,
      description: 'To update the customer',
      notes: 'Returns the status of customer, if updated',
      tags: ['api', 'Customers'],
      /** @memberof paylaod validator */
      response: patch.responseValidate
    }
  }
]
