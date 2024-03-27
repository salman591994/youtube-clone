import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Add middleware
app.use(cors());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(cookieParser());

//ROUTS
import userRouter from "./routes/user.routes.js"

//routes decleration
app.use("/api/v1/users",userRouter)



export default app;
