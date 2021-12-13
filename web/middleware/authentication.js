const jwt = require('jsonwebtoken')
const secreteKey = 'yourSecrete'

const genreateJWT = (customerId) => {
  const payload = { customerId }
  const token = jwt.sign(payload, secreteKey)
  return token
}

module.exports = { genreateJWT }
