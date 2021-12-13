'use strict'
const redis = require('redis')
const config = require('../../config')
const redisPort = config.redis.port
const { promisifyAll } = require('bluebird') // to make  async
promisifyAll(redis)
const client = redis.createClient({
  host: '127.0.0.1',
  port: redisPort
})

client.on('connect', () => console.log('Redis connected Successfuly !'))
client.on('error', (error) => {
  console.error(error)
})

module.exports = client
