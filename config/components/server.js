"use strict";
const Joi = require("joi");
const envVarSchem = Joi.object({
  PORT: Joi.number().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarSchem.validate(process.env);
if (error) throw new Error(`Config validation Error ${error.message}`);

const config = {
  server: {
    port: envVars.PORT,
  },
};

module.exports = config;
