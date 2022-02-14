const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

// JWT
const expiresIn = "1h"; // time to live
const SECRET_KEY = "secret_key"; // secret key
const tokenPrefix = "JWT"; // Prefix for HTTP header

const tokenMiddleware = (req, res, next) => {
  try {
    const [prefix, payload] = req.headers["authorization"].split(" ");

    if (!payload) {
      //no token in the header
      throw new HttpError("No token provided", 401);
    }
    if (prefix !== tokenPrefix) {
      //unexpected prefix or format
      throw new HttpError("Invalid header format", 401);
    }
    const decodedToken = jwt.verify(payload, SECRET_KEY);
    // req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Access denied!", 401));
  }
};

const createToken = (email) => {
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn,
  });
  return token;
};

module.exports = {
  tokenMiddleware,
  createToken,
};
