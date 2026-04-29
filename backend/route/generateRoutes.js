import express from "express";
import { generatePaper } from "../controller/generatePaper.js";
import { verifyToken } from "../middleware/authentication.js";

const generateRoutes = express.Router();

generateRoutes.post("/generate", verifyToken, generatePaper)

export default generateRoutes