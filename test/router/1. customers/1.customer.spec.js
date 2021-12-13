const stub = require('../../stubFolder/customer')
const apiHandler = require('../../../web/router/customers/sign_up')

const mongodb = require('../../../library/mongodb')

/**
 * @beforeAll
 */
beforeAll(async() => mongodb.connect())
/**
 * @afterAll
 */
afterAll(async () => mongodb.close())

test('should call signUp api ---> succes', async () => {
  const req = { ...stub.req }
  req.payload = stub.customer200
  const reply = {
    response: (obj) => {
      const code = (statusCode) => {
        expect(statusCode).toBe(200)
      }
      return {
        code
      }
    }
  }
  await apiHandler.handler(req, reply)
})

test('should call signUp api --> 402', async () => {
  const req = { ...stub.req }
  req.payload = stub.customer402
  const reply = {
    response: obj => {
      const code = (statusCode) => {
        expect(statusCode).toBe(402)
      }
      return {
        code
      }
    }
  }
  await apiHandler.handler(req, reply)
})
