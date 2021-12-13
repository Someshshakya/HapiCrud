'use strict'
const signUp = require('./sign_up')
const get = require('./get')
const del = require('./delete')
const put = require('./put')
const login = require('./login')
const headerValidator = require('../../middleware/validator')

module.exports = [
  /**
   * api to signUp
   */
  {
    method: 'POST',
    path: '/customers',
    options: {
      validate: {
        /** @memberof postSignUP Validator */
        payload: signUp.validateCustomer, // Payload validator
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthValidator, // header validation
        failAction: headerValidator.customError
      },
      description: 'To signup the customer ',
      notes: 'Returns the status of customer, if created',
      tags: ['api', 'Customers']
    },
    /** @memberOf SignIn */
    handler: signUp.handler
  },
  /**
   * api to update
   */
  {
    method: 'PUT',
    path: '/customers/{id}',
    options: {
      validate: { ...signUp.validate_customer, ...get.validateParams },
      handler: put.handler,
      description: 'To update the customer',
      notes: 'Returns the status of customer, if updated',
      tags: ['api', 'Customers']
    }
  },
  {
    method: 'GET',
    path: '/customers',
    options: {
      description: 'To all get the customer',
      notes: 'Returns the Array of customer, if found',
      tags: ['api', 'Customers'],
      handler: get.handler
    }
  },
  {
    method: 'GET',
    path: '/customers/{id}',
    options: {
      description: 'To get the customer by id',
      notes: 'Returns the Array of customer, if found',
      tags: ['api', 'Customers'],
      handler: get.handler,
      validate: get.validateParams
    }
  },
  {
    method: 'DELETE',
    path: '/customers/{id}',
    options: {
      handler: del.handler,
      validate: get.validateParams,
      description: 'To  detete the customer ',
      notes: 'Returns the status of customer, if deleted',
      tags: ['api', 'Customers']
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      validate: login.validateCustomer,
      handler: login.handler,
      description: 'To login the customer ',
      notes: 'Returns the status of customer, if logged in',
      tags: ['api', 'Customers']
    }
  }
]
