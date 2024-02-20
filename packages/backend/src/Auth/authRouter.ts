// src/Auth/authRouter.ts

import { Router } from "express";
import * as AuthController from "./authController";

const authRouter = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login);

export default authRouter;
