"use strict";
const db = require("../monogodb");
const collectionName = "product";
const { ObjectId } = require("mongodb");

const postProducts = async (data) => {
  const collection = await db.get().collection(collectionName);
  const product = await collection.insertOne(data);
  return product;
};

const getProducts = async (data) => {
  const { id, customer_id } = data;
  let products;
  const collection = await db.get().collection(collectionName);
  if (id != undefined) {
    const query = { _id: ObjectId(id), customer_id };
    products = await collection.findOne(query);
  } else {
    products = await collection.find({ customer_id }).toArray();
  }
  return products;
};

const deleteProduct = async (product) => {
  const { id, customer_id } = product;
  let query;
  let data;
  if (id != undefined) {
    query = { _id: ObjectId(id) };
    data = await db.get().collection(collectionName).deleteOne(query);
  } else {
    query = { customer_id };
    data = await db.get().collection(collectionName).deleteMany(query);
  }
  return data;
};

const updateProduct = async (id, data) => {
  const query = { _id: ObjectId(id) };
  const update_doc = {
    $set: data,
  };
  const options = { upsert: false };
  const result = await db
    .get()
    .collection(collectionName)
    .updateOne(query, update_doc, options);
  return result;
};
module.exports = { postProducts, getProducts, deleteProduct, updateProduct };
