"use strict";
const products = require("../../../models/products");

const handler = async (req, res) => {
  const productDetails = req.params;
  const product = await products.getProducts(productDetails);
  return res.response({
    status: "Here is the List of Products",
    product,
  });
};

module.exports = { handler };
