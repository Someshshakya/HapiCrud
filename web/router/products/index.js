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
    },
    handler: post.handler,
  },
  {
    method: "PUT",
    path: "/products/{id}",
    options: {
      validate: post.validate_product,
    },
    handler: put.handler,
  },
  {
    method: "GET",
    path: "/products/{customer_id}/{id?}",
    handler: get.handler,
  },
  {
    method: "GET",
    path: "/hello",
    options: {
      handler: (req, h) => {
        console.log("checing pararms", req.params);
        return req.params;
      },
    },
  },
  {
    method: "DELETE",
    path: "/products/{customer_id}/{id?}",
    handler: del.handler,
  },
];
