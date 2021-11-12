"use strict";
const products = require("../../../models/products");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const handler = async (req, res) => {
  const product_data = req.payload;
  const product = await products.postProducts(product_data);
  return res.response({
    status: "You Product Inserted Successfully !",
    product,
  });
};

const validate_product = {
  payload: Joi.object({
    name: Joi.string().min(3).max(50),
    ram: Joi.string().required(),
    display_size: Joi.string().required(),
    operating_system: Joi.string().required(),
    customer_id: Joi.objectId().required(),
  }),
};

module.exports = { handler, validate_product };
