'use strict'
const products = require('./products')
const customer = require('./customers')
const redisProducts = require('./redisProducts')
const elasticProducts = require('./ElasticSearchProduct')

const routes = [].concat(
  products,
  customer,
  redisProducts,
  elasticProducts
)

const register = (server, options) => {
  server.route(routes)
  console.log('routes register ')
}

exports.plugin = {
  name: 'base-rutes',
  version: '1.0.0',
  register
}
