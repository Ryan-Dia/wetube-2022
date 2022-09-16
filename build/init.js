"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 80;

if (PORT === 80) {
  process.env.EC2_ON = "activate";
}

var handleListening = function handleListening() {
  return console.log("\u2705 Server listening on port http://localhost:".concat(PORT));
};

console.log(process.env.EC2_ON);

_server["default"].listen(PORT, handleListening);