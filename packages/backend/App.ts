import express, { Express } from "express";
import dotenv from "dotenv";
import exp from "constants";
import userRouter from "./src/Users/userRouter";
import authRouter from "./src/Auth/authRouter";

const app: Express = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/auth", authRouter);
export default app;
