"use strict";
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const customer = require("../../../models/customer");

const handler = async (req, res) => {
  const product_id = req.params.id;
  const result = await customer.getCustomer(product_id);
  return res.response({
    status: "Following Are The Results for Customers:- ",
    result,
  });
};

const validateParams = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};

module.exports = { handler, validateParams };
