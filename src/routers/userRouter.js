import express from "express";
import {
  edit,
  remove,
  see,
  startGihubLogin,
  finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGihubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);
export default userRouter;
