const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const schema = require("./schemas/schema");
const { getCountryByName } = require("./resolvers/country-resolvers");
const usersRouter = require("./routes/users-route");
const HttpError = require("./models/http-error");
const { tokenMiddleware } = require("./middlewares/token-middleware");
const apiLimiter = require("./middlewares/rate-limit-middleware");

const app = express();
const PORT = process.env.PORTNUM;

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use(cors());

// Seperate login endpoint
app.use("/login", usersRouter);

// Authentication middleware
app.use("/graphql", tokenMiddleware);

// Apply the rate limiting middleware to API calls only
app.use('/graphql', apiLimiter);

// Root resolver
var root = {
  getCountryByName,
};

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema,
  rootValue: root,
  graphiql: true,
})));

app.use((req, res, next) => {
  throw new HttpError("Page not found.", 404);
});

// when we provide four parameters for the 'use' function,
// express interprets it as an Error Handler middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ msg: error.message || "an error accured" });
});

app.listen(PORT, (err) => {
  if (err) console.log("Error: cannot start the server.");
  else console.log(`Server started listening at port ${PORT}`);
});
