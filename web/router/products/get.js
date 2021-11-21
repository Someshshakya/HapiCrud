"use strict";
const products = require("../../../models/products");
const { auth: jwt } = require("../../middleware");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const handler = async (req, res) => {
  const token = req.headers.authorization; // recieving token from the headers
  let productDetails = {};
  if (req.params.id) {
    productDetails["id"] = req.params.id;
  }
  productDetails["customer_id"] = req.customer_id;

  // prettier-ignore
  const product = await products.getProducts(productDetails); // XXX X X X X XXX
  const response = res.response({
    status: "Here is the List of Products",
    product,
  });
  response.header("Authorization", token); // set the token in the header
  return response;
};

const validateCustomerId = {
  params: Joi.object({
    customer_id: Joi.objectId().required(),
  }),
};
const validateId = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
};

const headerValidate = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
};
module.exports = {
  handler,
  validateCustomerId,
  validateId,
  headerValidate,
};
