"use strict";
const post = require("./post");
const get = require("./get");
const del = require("./delete");
const put = require("./put");

module.exports = [
  {
    method: "POST",
    path: "/products",
    options: {
      validate: post.validate_product,
      handler: post.handler,
      description: "To Create the Products for particular Customer",
      notes: "Data must be an object to add the Product !",
      tags: ["api", "Products"],
    },
  },
  {
    method: "PUT",
    path: "/products/{id}",
    options: {
      validate: { ...post.validate_product, ...get.validateId },
      handler: put.handler,
      description: "To Update The product",
      notes: "Returns the Status of the Product",
      tags: ["api", "Products"],
    },
  },
  {
    method: "GET",
    path: "/products/{customer_id}/{id}",
    options: {
      handler: get.handler,
      validate: get.validateParams,
      description: "To Get product of a particular Customer by  product's  id ",
      notes: "Returns a Products ",
      tags: ["api", "Products"],
    },
  },
  {
    method: "GET",
    path: "/products/{customer_id}",
    options: {
      handler: get.handler,
      validate: { ...get.validateCustomerId, ...get.headerValidate },
      description: "To Get All the Products for a particular Customer ",
      notes: "Returns The Array of Products ",
      tags: ["api", "Products"],
    },
  },
  {
    method: "DELETE",
    path: "/products/{customer_id}/{id}",
    options: {
      handler: del.handler,
      validate: get.validateParams,
      description: "To Delete the  Products for particular Customer by id",
      notes: "Returns The Status of Products",
      tags: ["api", "Products"],
    },
  },
  {
    method: "DELETE",
    path: "/products/{customer_id}",
    options: {
      handler: del.handler,
      validate: get.validateCustomerId,
      description: "To Delete  All the  Products for particular Customer",
      notes: "Returns The Status of Products",
      tags: ["api", "Products"],
    },
  },
];
