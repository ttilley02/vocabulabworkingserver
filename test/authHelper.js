const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//test auth to be used in spec.js

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
   const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: "HS256",
   });
   return `Bearer ${token}`;
}

module.exports = {
   makeAuthHeader,
};
