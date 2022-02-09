'use strict'
const post = require('./post')
const get = require('./get')
const put = require('./patch')
const del = require('./delete')

module.exports = [].concat(
  post,
  get,
  put,
  del
)
