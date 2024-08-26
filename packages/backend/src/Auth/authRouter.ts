import { Router } from "express";
import { authController } from "./authController";
import protect from "../Middlewares/authMiddlewares"; // Adjust the import path as necessary

const authRouter = Router();

// Public routes
authRouter.post(
  "/forgotPassword",
  authController.forgotPassword.bind(authController)
);
authRouter.patch(
  "/resetPassword/:signResetPasswordToken",
  authController.resetPassword.bind(authController)
);
authRouter.post("/logout", authController.logout.bind(authController));
authRouter.post("/signup", authController.signup.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.put(
  "/changePassword",
  authController.changePassword.bind(authController)
);
authRouter.post(
  "/refresh-token/:id",
  authController.refreshToken.bind(authController)
);

export default authRouter;
