const config = require('../../config')
const defaulLan = config.server.defaulLanguage // default language
const language = config.server.language

const options = {
  locales: language.split(','),
  directory: './locales',
  languageHeaderField: 'language',
  dfaultLocale: defaulLan,
  objectNotation: true
}

module.exports = {
  plugin: require('hapi-i18n'),
  options
}
