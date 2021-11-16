const jwt = require("jsonwebtoken");
const secreteKey = "yourSecrete";

const genreateJWT = (customer_id) => {
  const payload = { customer_id };
  const token = jwt.sign(payload, secreteKey);
  return token;
};

const verifyJWT = (token) => {
  const { customer_id } = jwt.verify(token, secreteKey);
  return customer_id;
};
module.exports = { genreateJWT, verifyJWT };
