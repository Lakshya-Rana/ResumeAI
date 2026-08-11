import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//basic configuration
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials : true,
    methods : ["GET","PUT","POST","DELETE","PATCH","OPTIONS"],
}),
)

import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/users",authRouter)

import resumeRouter from "./routes/resume.routes.js"
app.use("/api/v1/resumes",resumeRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
  });
});

export default app