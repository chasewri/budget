const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const Auth = require("./middle/auth");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(Auth);

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

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
