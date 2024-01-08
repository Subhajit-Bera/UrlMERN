// utils/verifyToken.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
