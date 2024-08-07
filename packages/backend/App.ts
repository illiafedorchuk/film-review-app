import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import reviewRoter from "./src/Review/reviewRouter";
import userRouter from "./src/Users/userRouter";
import authRouter from "./src/Auth/authRouter";
import commentRouter from "./src/Comments/commentRouter";
import { globalErrorHandler } from "./src/Utils/ErrorController"; // Adjust the path as necessary
import movieRouter from "./src/Movies/movieRouter";

const app: Express = express();
const apiKey = process.env.API_KEY;
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
app.use("/movie", movieRouter);
app.use("/user", userRouter);
app.use("/review", reviewRoter);
app.use("/comment", commentRouter);
// Use the global error handler as the last middleware
app.use(globalErrorHandler);

export default app;
