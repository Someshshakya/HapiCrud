"use strict";
const products = require("./products");
const customer = require("./customers");
const redisProducts = require("./redisProducts");
const elasticProducts = require("./ElasticSearchProduct");

module.exports = [].concat(products, customer, redisProducts, elasticProducts);
