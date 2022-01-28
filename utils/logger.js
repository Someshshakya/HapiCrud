'use strict'

const { createLogger, format, transports } = require('winston')

const logFormat = format.combine(
  format.colorize(),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.align(),
  format.printf((info) => {
    const stringifiedRest = JSON.stringify({
      ...info,
      timestamp: undefined,
      level: undefined,
      message: undefined,
      splat: undefined
    })
    const padding = info.padding ? info.padding[info.level] : ''
    if (stringifiedRest !== '{}') {
      return `${info.timestamp} ${info.level}:${padding} ${info.message} ${stringifiedRest}`
    }
    return `${info.timestamp} ${info.level}:${padding} ${info.message}`
  })
)

const errorLogger = createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new transports.Console()
    // new transports.File({
    // filename : 'logs/error.log'
    // })
  ]
})

const infoLogger = createLogger({
  level: 'log',
  format: logFormat,
  transports: [
    new transports.Console()
    // new transports.File({
    // filename : 'logs/info.log'
    // })
  ]
})
const debugLogger = createLogger({
  level: 'debug',
  format: logFormat,
  transports: [
    new transports.Console()
    // new transports.File({
    // filename : 'logs/debug.log'
    // })
  ]
})

const warnLogger = createLogger({
  level: 'warn',
  format: logFormat,
  transports: [
    new transports.Console()
    // new transports.File({
    // filename : 'logs/warn.log'
    // })
  ]
})
module.exports = {
  infoLogger, errorLogger, debugLogger, warnLogger
}
