"use strict";
const Joi = require("joi");
const envVarSchem = Joi.object({
  MONGODB_URL: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarSchem.validate(process.env);
if (error) throw new Error(`Config validation Error ${error.message}`);

const config = {
  mongodb: {
    url: envVars.MONGODB_URL,
  },
};

module.exports = config;
