// const { v4: uuid_v4 } = require("uuid");
const { validationResult } = require("express-validator");
const database_users = require("../data/users");
const {createToken} = require("../middlewares/token-middleware");

const HttpError = require("../models/http-error");

const userLogin = async (req, res, next) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${param} has ${msg} >>> ${value}`;
    }
  );
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    // return res.json({ errors: result.array() });
    let errorMessage = "";
    result.array().forEach((element) => {
      errorMessage += element + "\n";
    });
    return next(new HttpError(errorMessage, 422));
  }

  const { email, password } = req.body;
  // console.log(email);  

  let user = null;
  try {
    user = database_users.find((user) => user.email === email);
  } catch (err) {
    console.log(err);
    return next(new HttpError("users: something's wrong!", 500));
  }

  if (!user || user.password !== password) {
    // 401 === authentication is failed
    return next(
      new HttpError(
        "User not found. looks like the credentials are wrong.",
        401
      )
    );
  }

  let token = null;
  try {
    token = createToken(email);
  } catch (err) {
    return next(new HttpError("Error happend while creating the token.", 500));
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    imageUrl: user.imageUrl,
    email: user.email,
    token: token,
  });
};

module.exports = {
  userLogin,
}
