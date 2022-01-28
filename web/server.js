'use strict'
const Hapi = require('@hapi/hapi')
const config = require('../config')
const port = config.server.port || 8000
const Db = require('../library/mongodb') // create connection to mongodb
const middleware = require('../web/middleware')
const {infoLogger}  = require('../utils/logger')
// const { customError } = require('./middleware/validator')
// const redis = require('../models/redis') // connect redis
// const elasticSearch = require('../models/elasticSearch')
const jwt2 = require('./middleware/authJwt2')
// const { plugin } = require('hapi-i18n')
// const routes = require('./router')
const server = new Hapi.Server({
  port
})

const startServer = async () => {
  try {
    await server.register([
      middleware.swagger.Swagger,
      middleware.swagger.Inert,
      middleware.swagger.Vision,
      jwt2,
      middleware.localization
    ])
    // connect the routes with the server;
    server.route(require('./router'))
    try {
      await Db.connect() // mog
      console.log('Successfuly connected to database ...')
    } catch (error) {
      console.log('[MONGO DB] : connection error ...', error)
    }
    await server.start()
    console.log(`Server running on %s ${server.info.uri}`)
  } catch (error) {
    console.log('[Server] : Server starting  error..... ', error)
    process.exit(1)
  }
}

// method for stop server
const stopSever = async () => {
  await Db.close()
  await server.stop()
}

module.exports = { startServer, stopSever, server }
