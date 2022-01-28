'use strict'
var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.5' // use the same version of your Elasticsearch instance
})

module.exports = client
