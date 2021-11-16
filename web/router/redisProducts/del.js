"use strict";
const client = require("../../../models/redis");
const handler = async (req, res) => {
  try {
    let result;
    result = await client.delAsync("product");
    result = JSON.parse(result);
    return res.response({
      status: "your product deleted from cached !",
      result,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handler,
};
