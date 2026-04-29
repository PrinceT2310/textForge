import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import generateRoutes from "./route/generateRoutes.js";
import userRoutes from "./route/userRoutes.js";

import "./config/database.js";
import submitRoutes from "./route/submitRoutes.js";
import testRoutes from "./route/testRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.get("/test", (req, res) => {
  res.send("Hello World!");
}
);

app.use("/api",generateRoutes,submitRoutes,testRoutes);
app.use("/api/user",userRoutes);

const PORT = process.env.PORT || 5010;
app.listen(PORT, ()=>{
  console.log("server running")
})