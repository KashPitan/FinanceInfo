//imports express for router set up
const Express = require("express");
//imports the express router object to set up routes for api calls
const Router = Express.Router();

//function to create child process and run python script
const callScript = (req) => {
  //creates the child process
  var spawn = require("child_process").spawn;
  //spawns the child process
  //first parameter is the programming language
  //the second parameter is the location of the script(and extras see docs)
  var process = spawn("python", ["../scripts/script_test.py"]);

  //takes the data printed from the file and runs the function below on it
  process.stdout.on("data", (data) => {
    //inside here is the function run on the data received from the python file
    // res.send(data.toString());
    console.log(data);
  });
};

/*this sets up the api route and attaches it to the router object
first parameter is whatever is appended to the route from the server file
*/
Router.get("/", function (req, res, next) {
  //inside here is the function run when the route is accessed
  console.log("test123");
  callScript(req);
});

//exports the routes
module.exports = Router;
