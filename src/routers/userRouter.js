import express from "express";
import {
  getEdit,
  postEdit,
  startGihubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGihubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
export default userRouter;
