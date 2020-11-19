//imports express for router set up
const Express = require("express");
//imports the express router object to set up routes for api calls
const Router = Express.Router();

const dotenv = require("dotenv");
dotenv.config();

const python_path = process.env.PYTHON_PATH;

console.log(python_path);
var spawn = require("child_process").spawn;

/*this sets up the api route and attaches it to the router object
first parameter is whatever is appended to the route from the server file
*/
Router.get("/", async (req, res, next) => {
  //inside here is the function run when the route is accessed
  //spawns the child process
  //first parameter is the programming language
  //the second parameter is the location of the script(and extras see docs)

  let query = req.query;
  query = JSON.stringify(query);

  var process = spawn("python", ["./scripts/get_stock_data.py", query]);

  let test = "";
  //takes the data printed from the file and runs the function below on it
  process.stdout.on("data", (data) => {
    //inside here is the function run on the data received from the python file
    test += data.toString();
  });

  process.stdout.on("end", () => {
    console.log("Python output at end: " + test);
    res.status(200).send(test);
  });
});

//exports the routes
module.exports = Router;
