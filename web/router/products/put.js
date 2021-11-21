"use strict";
const products = require("../../../models/products");

const handler = async (req, res) => {
  const product_id = req.params.id;
  const data = req.payload;
  data["customer_id"] = req.customer_id;

  const product = await products.updateProduct(product_id, data);
  return res.response({
    status: "Your Product Modified  Successfully !",
    product,
  });
};

module.exports = { handler };
