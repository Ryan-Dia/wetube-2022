"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.publicOnlyMiddleware = exports.protectorMiddleware = exports.localsMiddleware = exports.avatarUpload = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var isEc2on = process.env.EC2_ON === "activate";
console.log(isEc2on);
var s3ImageUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "wetube-2022/images",
  acl: "public-read"
});
var s3VideoUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "wetube-2022/videos",
  acl: "public-read",
  contentType: _multerS["default"].AUTO_CONTENT_TYPE
});

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
}; //user가 loggedin 돼 있다면, 요청을 계속 하게 하고  loggedIn 돼 있지 않으면, 로그인 페이지로 redirect 해줄 것이다.


exports.localsMiddleware = localsMiddleware;

var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) return next();else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
}; // user가 loggedIn 돼 있지 않으면 요청을 계속하게 하고  loggedIn 돼 있으면 "/"으로 redirect 해준다.


exports.protectorMiddleware = protectorMiddleware;

var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (!req.session.loggedIn) return next();else {
    req.flash("error", "Not autohorized");
    return res.redirect("/");
  }
};

exports.publicOnlyMiddleware = publicOnlyMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 4000000
  },
  storage: isEc2on ? s3ImageUploader : undefined
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/videos/",
  limits: {
    fileSize: 150000000
  },
  storage: isEc2on ? s3VideoUploader : undefined
});
exports.videoUpload = videoUpload;