const express = require("express");
const schema = require("./schemas/schema");
var { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const { getCountryByName } = require("./resolvers/country-resolvers");
const usersRouter = require("./routes/users-route");
const HttpError = require("./models/http-error");

const app = express();
const PORT = process.env.PORTNUM;

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use(cors());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  
  next();
});

// Root resolver
var root = {
  getCountryByName,
};

app.use("/login", usersRouter);
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
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
  else console.log(`Server started at port ${PORT}`);
});
