// middleware/isAuth.js
const { getTokenFromHeader, verifyToken } = require('../utils/authUtils'); // Assuming these functions are in authUtils.js

exports.isAuth = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);

  // verify the token
  const decodedUser = verifyToken(token);

  // If verifyToken returns false
  if (!decodedUser) {
    throw new Error("Invalid/Expired token, please log in again");
  } else {
    // If verifyToken returns the user
    // save the user into req obj
    // We are adding userAuthId (custom) field to the req object and assign the decodedUser id to it
    req.userAuthId = decodedUser?.id;
    next();
  }
};

