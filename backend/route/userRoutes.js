import express from "express";
import { handleLogin, handleSignup } from "../controller/userLogic.js";

const userRoutes = express.Router();

userRoutes.post("/signup",handleSignup)
userRoutes.post("/login",handleLogin)

export default userRoutes