"use strict";
const products = require("../../../models/products");

const handler = async (req, res) => {
  const product_id = req.params.id;
  const data = req.payload;
  const product = await products.updateProduct(product_id, data);
  return res.response({
    status: "Your Product Modified  Successfully !",
    product,
  });
};

module.exports = { handler };
