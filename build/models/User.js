"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatarUrl: {
    type: String
  },
  socialOnly: {
    type: Boolean,
    "default": false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: String,
  commnets: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  videos: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }]
});
/* userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
}); */

userSchema["static"]("hashPassword", function (password) {
  password = _bcrypt["default"].hash(password, 5);
  console.log("oh no!!");
  return password;
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;