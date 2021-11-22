const jwt = require("jsonwebtoken");
const secreteKey = "yourSecrete";

const genreateJWT = (customer_id) => {
  const payload = { customer_id };
  const token = jwt.sign(payload, secreteKey);
  return token;
};

module.exports = { genreateJWT };
