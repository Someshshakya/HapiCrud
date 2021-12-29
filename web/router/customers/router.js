'use strict'
const post = require('./post')
const get = require('./get')
const del = require('./delete')
const put = require('./put')
const login = require('./login')
const headerValidator = require('../../middleware/validator')

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
        payload: post.validateCustomer, // Payload validator
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthValidator, // header validation
        failAction: headerValidator.customError
      },
      description: 'To signup the customer ',
      notes: 'Returns the status of customer, if created',
      tags: ['api', 'Customers'],
      response: post.responseValidate // response for Swagger
    },
    /** @memberOf SignIn */
    handler: post.handler
  },
  /**
   * *api to update
   */
  {
    method: 'PUT',
    path: '/customers/{id}',
    options: {
      validate: {
        headers: headerValidator.headerAuthValidator, // header validation
        query: get.validateId, // query validation
        payload: post.validateCustomer // payload validate
      },
      handler: put.handler,
      description: 'To update the customer',
      notes: 'Returns the status of customer, if updated',
      tags: ['api', 'Customers'],
      response: put.responseValidate // response validate
    }
  },
  /**
   * *api to get Customers
   */
  {
    method: 'GET',
    path: '/customers/{id?}',
    options: {
      validate: {
        headers: headerValidator.headerAuthValidator, // header validation
        query: get.validateId // query validation
      },
      description: 'To all get the customer if particular id is not defined',
      notes: 'Returns the Array of customer, if found',
      tags: ['api', 'Customers'],
      handler: get.handler,
      response: get.responseValidate // response for swagger
    }
  },
  /**
   * *api to delete Customers
   */
  {
    method: 'DELETE',
    path: '/customers/{id}',
    options: {
      handler: del.handler,
      validate: {
        query: get.validateId,
        headers: headerValidator.headerAuthValidator
      },
      description: 'To  detete the customer ',
      notes: 'Returns the status of customer, if deleted',
      tags: ['api', 'Customers']
    }
  },
  /**
   * *api to Login the customer
   */
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
