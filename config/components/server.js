'use strict'
const Joi = require('joi')
const envVarSchem = Joi.object({
  PORT: Joi.number().required(),
  DEFAULT_LANGUAGE: Joi.string().required(),
  LANGUAGES: Joi.string().required(),
  VERSION: Joi.string().required()
})
  .unknown()
  .required()

const { error, value: envVars } = envVarSchem.validate(process.env)
if (error) throw new Error(`Config validation Error ${error.message}`)

const config = {
  server: {
    port: envVars.PORT,
    defaulLanguage: envVars.DEFAULT_LANGUAGE,
    language: envVars.LANGUAGES,
    version: envVars.VERSION
  }
}

module.exports = config
