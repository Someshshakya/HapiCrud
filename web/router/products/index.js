'use strict'
const post = require('./post')
const get = require('./get')
const del = require('./delete')
const put = require('./put')
const headerValidate = require('../../middleware/validator')

module.exports = [
  {
    method: 'POST',
    path: '/products',
    options: {
      auth: 'jwt', // to secure the route
      validate: {
        payload: post.validateProduct,
        headers: headerValidate.headerAuthValidator // header validation
      },
      description: 'To Create the Products for particular Customer',
      notes: 'Data must be an object to add the Product !',
      tags: ['api', 'Products']
    },
    handler: post.handler
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    options: {
      auth: 'jwt', // to secure the route
      validate: {
        params: get.validateId,
        headers: headerValidate.headerAuthValidator,
        payload: post.validateProduct
      },
      description: 'To Update The product',
      notes: 'Returns the Status of the Product',
      tags: ['api', 'Products']
    },
    handler: put.handler
  },
  {
    method: 'GET',
    path: '/products/{id}',
    options: {
      auth: 'jwt', // to secure the route
      description: "To Get product of a particular Customer by  product's  id ",
      notes: 'Returns a Products ',
      tags: ['api', 'Products']
    },
    handler: get.handler
  },
  {
    method: 'GET',
    path: '/products',
    options: {
      auth: 'jwt', // to secure the route
      validate: {
        headers: headerValidate.headerAuthValidator
      },
      description: 'To Get All the Products for a particular Customer ',
      notes: 'Returns The Array of Products ',
      tags: ['api', 'Products']
    },
    handler: get.handler
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    options: {
      auth: 'jwt', // to secure the route
      handler: del.handler,
      validate: {
        params: get.validateId,
        headers: headerValidate.headerAuthValidator
      },
      description: 'To Delete the  Products for particular Customer by id',
      notes: 'Returns The Status of Products',
      tags: ['api', 'Products']
    }
  },
  {
    method: 'DELETE',
    path: '/products',
    options: {
      auth: 'jwt', // to secure the route
      validate: {
        headers: headerValidate.headerAuthValidator
      },
      handler: del.handler,
      description: 'To Delete  All the  Products for particular Customer',
      notes: 'Returns The Status of Products',
      tags: ['api', 'Products']
    }
  }
]
