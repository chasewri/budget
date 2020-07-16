const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const Auth = require("./middle/authMiddleware");

require("dotenv").config();

const graphQlSchema = require("./api/schema/index");
const graphQlResolvers = require("./api/resolvers/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next()
});

app.use(Auth);

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`listening on port ${port}, also have a great day`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
