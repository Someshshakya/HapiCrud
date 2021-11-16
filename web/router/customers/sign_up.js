"use strict";
const customer = require("../../../models/customer");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// hass the password
const hashPassword = (plainPassword) => {
  const saltrounds = 10;
  return bcrypt.hash(plainPassword, saltrounds);
};

const handler = async (req, res) => {
  const customerData = req.payload;
  const { password } = customerData;
  customerData["password"] = await hashPassword(password);
  const result = await customer.postCustomer(customerData);
  return res.response({
    status: "You Customer Inserted Successfully !",
    result,
  });
};

const validate_customer = {
  payload: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .description("Name field is Required  for Customers"),
    email: Joi.string()
      .min(3)
      .required()
      .email()
      .description("Email field is Required  for Customers"),
    company: Joi.string()
      .required()
      .description("Comapany  field is Required  for Customers"),
    password: Joi.string()
      .min(8)
      .max(16)
      .required()
      .description("Password is required field for Customer!"),
  }),
};

module.exports = { handler, validate_customer };
