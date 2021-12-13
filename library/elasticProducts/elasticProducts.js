'use strict'
const elasticClient = require('../../library/elasticProducts')
const index = 'products'
const addProduct = async (data) => {
  const result = await elasticClient.index({
    index, // index = products
    body: data
  })
  return result
}
const getProduct = async (id) => {
  let data
  if (id !== undefined) {
    data = await elasticClient.get({
      index,
      id // id : id from params
    })
  } else {
    data = await elasticClient.search({
      index
    })
  }
  return data
}

const deleteProduct = async (id) => {
  const data = await elasticClient.delete({
    index,
    id: id // id : id from params
  })
  return data
}
const updateProduct = async (id, updatedData) => {
  const result = await elasticClient.update({
    index,
    id,
    body: {
      doc: updatedData
    }
  })
  return result
}

module.exports = { addProduct, getProduct, deleteProduct, updateProduct }
