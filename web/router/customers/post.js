"use strict";
const customer = require("../../../models/customer");
const Joi = require("joi");

const handler = async (req, res) => {
  const customerData = req.payload;

  const result = await customer.postCustomer(customerData);
  return res.response({
    status: "You Customer Inserted Successfully !",
    result,
  });
};

const validate_customer = {
  payload: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().min(3).required().email(),
    company: Joi.string().required(),
  }),
};

module.exports = { handler, validate_customer };
