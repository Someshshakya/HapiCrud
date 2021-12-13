'use strict'
const customer = require('../../../models/customer')

const handler = async (req, res) => {
  const customerId = req.params.id
  const result = await customer.deleteCustomer(customerId)
  return res.response({
    status: '❌️ Customer Deleted Successfully !',
    result
  })
}

module.exports = { handler }
