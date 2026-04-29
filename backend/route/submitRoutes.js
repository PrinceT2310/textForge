import express from "express"
import { verifyToken } from "../middleware/authentication.js"
import { submitPaper } from "../controller/submitPaper.js"

const submitRoutes = express.Router()

submitRoutes.post("/submit-test",verifyToken,submitPaper)

export default submitRoutes