import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import {authUser} from "../middelware/auth.js";

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/profile",authUser,getUserProfile)
userRouter.post("/logout",authUser,logoutUser)


export default userRouter