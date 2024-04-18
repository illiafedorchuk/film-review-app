import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./src/Users/userRouter";
import authRouter from "./src/Auth/authRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
// Import the global error handler
import { globalErrorHandler } from "./src/Utils/ErrorController"; // Adjust the path as necessary

const app: Express = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true,
  })
);
// Setup routes
app.use("/api", userRouter);
app.use("/auth", authRouter);

// Use the global error handler as the last middleware
app.use(globalErrorHandler);

export default app;
