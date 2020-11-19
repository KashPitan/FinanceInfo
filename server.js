//import for express server
const express = require("express");

//import and set up to allow the use of environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

//import routes set up in the ./routes directory
const liveDataRoutes = require("./routes/liveData");

//allow parsing of the body of api requests
const BodyParser = require("body-parser");

//sets up express app to initialize server
const App = express();

//parse body of api routes
App.use(BodyParser.json());

/*sets up the app to channel requests to the
 localhost:port/live url to the ./routes/liveData.js router
 the first parameter is whatever precedes the routes detailed in the file
*/
App.use("/live", liveDataRoutes);

/**
 * sets the port for the server to the port in the .env file
 * or 4000
 */
App.listen(process.env.PORT || 4000, () => {
  if (process.env.PORT) {
    console.log("listening on port " + process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

module.exports = App;
