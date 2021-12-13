'use strict'
const post = require('./post')
const get = require('./get')
const del = require('./del')
module.exports = [
  {
    method: 'POST',
    path: '/redis/products',
    options: {
      handler: post.handler,
      validate: post.validator,
      tags: ['api', 'Redis Products'],
      description: 'To cache the product',
      notes: 'Data must contain all the fields of Product!'
    }
  },
  {
    method: 'GET',
    path: '/redis/products',
    options: {
      handler: get.handler,
      tags: ['api', 'Redis Products'],
      description: 'To Retriev the  cached the product',
      notes: 'Returns the Cached data!'
    }
  },
  {
    method: 'DELETE',
    path: '/redis/products',
    options: {
      handler: del.handler,
      tags: ['api', 'Redis Products'],
      description: 'To delet from  the  cache',
      notes: 'Returns the  status of Cached data!'
    }
  }
]
