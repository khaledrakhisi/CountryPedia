const express = require("express");

const app = express();
const PORT = process.env.PORTNUM;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_NAME = process.env.DB_NAME;
//const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.twxfq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

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

// API Routes
app.use("/api/works", worksRouter);
app.use("/api/resume", resumeRouter);

app.listen(PORT, (err) => {
  if (err) console.log("Error: cannot start the server.");
  else console.log(`Server started at port ${PORT}`);
});
