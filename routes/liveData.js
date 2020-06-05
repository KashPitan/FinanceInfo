const Express = require("express");
const Router = Express.Router();

const callScript = (req) => {
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["../scripts/script_test.py"]);

  process.stdout.on("data", (data) => {
    // res.send(data.toString());
    console.log(data);
  });
};

Router.get("/", function (req, res, next) {
  console.log("test123");
  callScript(req);
});

module.exports = Router;
