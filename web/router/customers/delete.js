"use strict";
const customer = require("../../../models/customer");

const handler = async (req, res) => {
  const customer_id = req.params.id;
  const result = await customer.deleteCustomer(customer_id);
  return res.response({
    status: "❌️ Customer Deleted Successfully !",
    result,
  });
};

module.exports = { handler };
