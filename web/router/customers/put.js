'use strict'
const customer = require('../../../models/customer')

const handler = async (req, res) => {
  const customerId = req.params.id
  const data = req.payload
  const result = await customer.updateCustomer(customerId, data)
  return res.response({
    status: 'Customer Updated  Successfully !',
    result
  })
}

module.exports = { handler }
