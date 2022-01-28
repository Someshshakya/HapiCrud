const config = require('../config')
const defaultLan = config.server.defaulLanguage // default language from env  example : es hi and en
module.exports = require(`./${defaultLan}.json`)
