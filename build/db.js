"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect(process.env.DB_URL);

var db = _mongoose["default"].connection; //on 은 여러번 발생시킬 수 있는 이벤트 once는 딱 한번만 발생만

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB ");
};

db.on("error", function (error) {
  return console.log("DB Error", error);
});
db.once("open", handleOpen);