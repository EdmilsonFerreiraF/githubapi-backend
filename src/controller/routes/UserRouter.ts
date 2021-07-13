import express from "express";
import userController from "../UserController";

export const userRouter = express.Router();

userRouter.get("/login/callback", userController.loginCallback);
userRouter.get("/login/auth", userController.loginAuth);
userRouter.get("/login/details", userController.loginDetails);