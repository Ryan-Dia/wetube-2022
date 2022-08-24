import User from "../models/User";
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

  return res.redirect("/");
};

export const edit = (req, res) => res.render("Edit User");
export const remove = (req, res) => res.render("Delete User");
export const logout = (req, res) => res.render("Log out");
export const see = (req, res) => res.render("See User");
