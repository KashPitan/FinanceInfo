const express = require("express");
const dotenv = require("dotenv");

const BodyParser = require("body-parser");

dotenv.config();

const App = express();

//parse body of api routes
App.use(BodyParser.json());

App.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT) {
    console.log(process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

module.exports = App;
