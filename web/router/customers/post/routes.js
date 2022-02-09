'use strict'

/**
 * @global
 */

/**
 * @namespace
 */
const headerValidator = require('../../../middleware/validator')
const login = require('./login')
const post = require('./post')

/**
 * A module that exports Customer API  routes to hapi server!
 * @exports CUSTOMER-SYNC-DATUM-API-ROUTES
 */
module.exports = [
  /**
   * *api to signUp
   */
  {
    method: 'POST',
    path: '/customers',
    options: {
      validate: {
        /** @memberof postSignUP Validator */
        payload: post.validateCustomer,
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthValidator,
        failAction: headerValidator.customError
      },
      description: 'To signup the customer ',
      notes: 'Returns the status of customer, if created',
      tags: ['api', 'Customers'],
      response: post.responseValidate
    },
    /** @memberOf SignUp */
    handler: post.handler
  },
  /**
   * *api to Login the customer
   */
  {
    method: 'POST',
    path: '/login',
    options: {
      validate: {
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthValidator,
        /** @memberof login Validator */
        payload: login.validateCustomer
      },
      /** @memberOf login */
      handler: login.handler,
      description: 'To login the customer ',
      notes: 'Returns the status of customer, if logged in',
      tags: ['api', 'Customers'],
      response: login.responseValidate

    }
  }
]
