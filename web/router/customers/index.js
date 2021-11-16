"use strict";
const sign_up = require("./sign_up");
const get = require("./get");
const del = require("./delete");
const put = require("./put");
const login = require("./login");

module.exports = [
  {
    method: "POST",
    path: "/customers",
    options: {
      validate: sign_up.validate_customer,
      handler: sign_up.handler,
      description: "To signup the customer ",
      notes: "Returns the status of customer, if created",
      tags: ["api", "Customer"],
    },
  },
  {
    method: "PUT",
    path: "/customers/{id}",
    options: {
      validate: { ...sign_up.validate_customer, ...get.validateParams },
      handler: put.handler,
      description: "To update the customer",
      notes: "Returns the status of customer, if updated",
      tags: ["api", "Customer"],
    },
  },
  {
    method: "GET",
    path: "/customers",
    options: {
      description: "To all get the customer",
      notes: "Returns the Array of customer, if found",
      tags: ["api", "Customer"],
      handler: get.handler,
    },
  },
  {
    method: "GET",
    path: "/customers/{id}",
    options: {
      description: "To get the customer by id",
      notes: "Returns the Array of customer, if found",
      tags: ["api", "Customer"],
      handler: get.handler,
      validate: get.validateParams,
    },
  },
  {
    method: "DELETE",
    path: "/customers/{id}",
    options: {
      handler: del.handler,
      validate: get.validateParams,
      description: "To  detete the customer ",
      notes: "Returns the status of customer, if deleted",
      tags: ["api", "Customer"],
    },
  },
  {
    method: "POST",
    path: "/login",
    options: {
      validate: login.validate_customer,
      handler: login.handler,
      description: "To login the customer ",
      notes: "Returns the status of customer, if logged in",
      tags: ["api", "Customer"],
    },
  },
];
