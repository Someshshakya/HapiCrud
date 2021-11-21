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
      auth: "jwt", // to secure the route
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
      auth: "jwt", // to secure the route
      validate: { ...post.validate_product, ...get.validateId },
      handler: put.handler,
      description: "To Update The product",
      notes: "Returns the Status of the Product",
      tags: ["api", "Products"],
    },
  },
  {
    method: "GET",
    path: "/products/{id}",
    options: {
      auth: "jwt", // to secure the route
      handler: get.handler,
      validate: get.validateId,
      description: "To Get product of a particular Customer by  product's  id ",
      notes: "Returns a Products ",
      tags: ["api", "Products"],
    },
  },
  {
    method: "GET",
    path: "/products",
    options: {
      handler: get.handler,
      auth: "jwt", // to secure the route
      validate: get.headerValidate,
      description: "To Get All the Products for a particular Customer ",
      notes: "Returns The Array of Products ",
      tags: ["api", "Products"],
    },
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    options: {
      auth: "jwt", // to secure the route
      handler: del.handler,
      validate: get.validateId,
      description: "To Delete the  Products for particular Customer by id",
      notes: "Returns The Status of Products",
      tags: ["api", "Products"],
    },
  },
  {
    method: "DELETE",
    path: "/products",
    options: {
      auth: "jwt", // to secure the route
      handler: del.handler,
      description: "To Delete  All the  Products for particular Customer",
      notes: "Returns The Status of Products",
      tags: ["api", "Products"],
    },
  },
];
