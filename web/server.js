'use strict'
const Hapi = require('@hapi/hapi')
const config = require('../config')
const port = config.server.port || 8000
const Db = require('../library/mongodb') // connection to mongodb
const middleware = require('../web/middleware')
const jwt2 = require('./middleware/authJwt2')

const server = new Hapi.Server({
  port,
  host: 'localhost'
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
    await server.register([
      {
        plugin: require('./router'),
        routes: {
          prefix: '/v1'
        }
      }
    ])
    try {
      await Db.connect() // monogodb connect()
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

// method to stop server
const stopSever = async () => {
  await Db.close()
  await server.stop()
}

module.exports = { startServer, stopSever, server }
