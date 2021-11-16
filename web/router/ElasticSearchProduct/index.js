"use strict";
const post = require("./post");
const get = require("./get");
const del = require("./del");
const put = require("./put");
module.exports = [
  {
    method: "POST",
    path: "/elastic/products",
    options: {
      handler: post.handler,
      validate: post.validator,
      tags: ["api", "Elastic Search Products"],
      description: "To add Product in Elastic Search",
      notes: "Data must contain all the fields of Product!",
    },
  },
  {
    method: "GET",
    path: "/elastic/products/{id}",
    options: {
      handler: get.handler,
      validate: get.pramsIdValidator,
      tags: ["api", "Elastic Search Products"],
      description: "To get a Product in Elastic Search",
      notes: "Returns  the fields of Product!",
    },
  },
  {
    method: "GET",
    path: "/elastic/products",
    options: {
      handler: get.handler,
      tags: ["api", "Elastic Search Products"],
      description: "To get all Product in Elastic Search",
      notes: "Returns  the array of Product!",
    },
  },
  {
    method: "PUT",
    path: "/elastic/products/{id}",
    options: {
      handler: put.handler,
      validate: { ...post.validator, ...get.pramsIdValidator },
      tags: ["api", "Elastic Search Products"],
      description: "To update the  Product in Elastic Search",
      notes: "Data must contain all the fields of Product!",
    },
  },
  {
    method: "DELETE",
    path: "/elastic/products/{id}",
    options: {
      handler: del.handler,
      validate: get.pramsIdValidator,
      tags: ["api", "Elastic Search Products"],
      description: "To delete a Product in Elastic Search",
      notes: "Returns  the status of Product!",
    },
  },
];
