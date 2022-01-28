'use strict'
const customer = require('../../../models/customer')
const { ObjectId } = require('mongodb')
const { errorLogger } = require('../../../utils/logger')

const handler = async (req, h) => {
  const customerId = req.query.id
  const deleteCustomer = () => new Promise(async(resolve, reject) => {
    const filter = { _id: ObjectId(req.query.id) }
    const project = { projection: { FirstName: 1 } }
    const data = await customer.getCustomer(filter, project)
    if (data.length !== 0) {
      await customer.deleteCustomer(customerId)
      resolve(data)
    } else {
      reject({ message: req.i18n.__('deleteCustomer.404'), code: 404 })
    }
  })
  return deleteCustomer()
    .then(data => {
      return h.response({ message: req.i18n.__('deleteCustomer.200'), data }).code(200)
    })
    .catch(err => {
      if (err instanceof Error) {
        errorLogger('--err---', err)
        return h.response({ message: req.i18n.__('common.response.500') }).code(500)
      } else {
        return h.response({ message: err.message }).code(err.code)
      }
    })
}

module.exports = { handler }
