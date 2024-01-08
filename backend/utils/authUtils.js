// utils/authUtils.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

exports.getTokenFromHeader = (req) => {
  // get token from header
  const token = req?.headers?.authorization?.split(" ")[1];
  if (token === undefined) {
    return "No token found in the header";
  } else {
    return token;
  }
};
