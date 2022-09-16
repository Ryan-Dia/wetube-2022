import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "wetube--2022/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "wetube--2022/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

//user가 loggedin 돼 있다면, 요청을 계속 하게 하고  loggedIn 돼 있지 않으면, 로그인 페이지로 redirect 해줄 것이다.
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) return next();
  else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};

// user가 loggedIn 돼 있지 않으면 요청을 계속하게 하고  loggedIn 돼 있으면 "/"으로 redirect 해준다.
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) return next();
  else {
    req.flash("error", "Not autohorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 4000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 150000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});
