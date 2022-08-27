import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, passwordConfirm, location } =
    req.body;
  const usernameExists = await User.exists({ username });
  const emailExists = await User.exists({ email });
  if (usernameExists || emailExists || password !== passwordConfirm) {
    console.log(password, passwordConfirm);
    return res.render("join", {
      pageTitle: "join",
      userErrorMessage: usernameExists
        ? "This username is already taken"
        : null,
      emailErrorMessage: emailExists ? "This Email is already taken" : null,
      passwordErrorMessage:
        password !== passwordConfirm ? "Both passwords do not match." : null,
    });
  }
  await User.create({
    name,
    username,
    email,
    password: await User.hashPassword(password),
    location,
  });
  return res.redirect("/login");
};
export const getLogin = (req, res) =>
  res.render("Login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  let ok;
  if (user) ok = await bcrypt.compare(password, user.password);
  if (!user || !ok)
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Invalid username or password",
    });
  req.session.loggedIn = true;
  req.session.user = user;
  console.log(req.session);
  return res.redirect("/");
};

export const startGihubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    //공백으로 꼭  나누기
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com/";
    const userData = await (
      await fetch(`${apiUrl}user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(emailData);
  } else {
    return res.redirect("login");
  }
};

export const edit = (req, res) => res.render("Edit User");
export const remove = (req, res) => res.render("Delete User");
export const postLogout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = undefined;
  return res.redirect("/");
};
export const getLogout = (req, res) => res.redirect("/");

export const see = (req, res) => res.render("See User");
