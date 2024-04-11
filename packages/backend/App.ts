import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./src/Users/userRouter";
import authRouter from "./src/Auth/authRouter";
import cookieParser from "cookie-parser";
// Import the global error handler
import { globalErrorHandler } from "./src/Utils/ErrorController"; // Adjust the path as necessary

const app: Express = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

// Setup routes
app.use("/api", userRouter);
app.use("/auth", authRouter);

// Use the global error handler as the last middleware
app.use(globalErrorHandler);

export default app;
