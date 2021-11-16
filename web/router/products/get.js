"use strict";
const products = require("../../../models/products");
const { auth: jwt } = require("../../middleware");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const handler = async (req, res) => {
  const productDetails = req.params;
  // get the customer id
  const token = req.headers.authorization;
  // const customer_id  = jwt.verifyJWT(token);
  // verify and get the customer and set
  const product = await products.getProducts(productDetails);
  return res.response({
    status: "Here is the List of Products",
    product,
  });
};

const validateParams = {
  params: Joi.object({
    customer_id: Joi.objectId().required(),
    id: Joi.objectId().required(),
  }),
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
  validateParams,
  validateCustomerId,
  validateId,
  headerValidate,
};
