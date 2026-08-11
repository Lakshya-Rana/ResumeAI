import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (Postman, health checks, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "ResumeAI backend is running",
  });
});

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/users", authRouter);

import resumeRouter from "./routes/resume.routes.js";
app.use("/api/v1/resumes", resumeRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
  });
});

export default app;