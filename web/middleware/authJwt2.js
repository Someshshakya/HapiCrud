const products = require("../../models/products");
const validate = async (decoded, req, res) => {
  // if (!user) {
  //   return { credentials: null, isValid: true };
  // }

  // const isValid = await Bcrypt.compare(password, user.password);
  // const credentials = { id: user.id, name: user.name };
  // console.log(decoded);
  req.customer_id = decoded["customer_id"];
  return { isValid: true };
};

exports.plugin = {
  name: "jwtPlugin",
  version: "1.0.0",
  register: async (server, options) => {
    await server.register(require("hapi-auth-jwt2"));
    server.auth.strategy("jwt", "jwt", {
      key: "yourSecrete",
      validate, // validate function
    });
  },
};
