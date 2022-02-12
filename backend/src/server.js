const express = require("express");
const schema = require("./schemas/schema");
var { graphqlHTTP } = require("express-graphql");

const { getCountryByName } = require("./resolvers/country-resolvers");

const app = express();
const PORT = process.env.PORTNUM;

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

// Root resolver
var root = {
  // updateCourseTopic: updateCourseTopic
  getCountryByName,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  if (err) console.log("Error: cannot start the server.");
  else console.log(`Server started at port ${PORT}`);
});
