"use strict";
const Joi = require("joi");
const envVarSchem = Joi.object({
  REDIS_PORT: Joi.number().required(),
})
  .unknown()
  .required();
const { error, value: envVars } = envVarSchem.validate(process.env);
if (error) throw new Error(` Config validation Error ${error.message}`);

const config = {
  redis: {
    port: envVars.REDIS_PORT,
  },
};

module.exports = config;
