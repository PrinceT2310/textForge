import express from "express"
import { verifyToken } from "../middleware/authentication.js";
import { addTestPaper, getDashboard } from "../controller/testPapers.js";

const testRoutes = express.Router();

testRoutes.post("/save-test",verifyToken,addTestPaper)

testRoutes.get("/dashboard",verifyToken, getDashboard);

export default testRoutes