"use strict";
const post = require("./post");
const get = require("./get");
const del = require("./delete");
const put = require("./put");

module.exports = [
  {
    method: "POST",
    path: "/customers",
    options: {
      validate: post.validate_customer,
    },
    handler: post.handler,
  },
  {
    method: "PUT",
    path: "/customers/{id}",
    options: {
      validate: post.validate_customer,
    },
    handler: put.handler,
  },
  {
    method: "GET",
    path: "/customers/{id?}",
    handler: get.handler,
  },
  {
    method: "DELETE",
    path: "/customers/{id}",
    handler: del.handler,
  },
];
