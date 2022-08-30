import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

//user가 loggedin 돼 있다면, 요청을 계속 하게 하고  loggedIn 돼 있지 않으면, 로그인 페이지로 redirect 해줄 것이다.
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) return next();
  else return res.redirect("/login");
};

// user가 loggedIn 돼 있지 않으면 요청을 계속하게 하고  loggedIn 돼 있으면 "/"으로 redirect 해준다.
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) return next();
  else return res.redirect("/");
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 250000000,
  },
});
