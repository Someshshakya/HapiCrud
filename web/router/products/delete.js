"use strict";
const products = require("../../../models/products");

const handler = async (req, res) => {
  const product_d = req.params;
  const product = await products.deleteProduct(product_d);
  return res.response({
    status: "Your Product Deleted Successfully !",
    product,
  });
};

module.exports = { handler };
