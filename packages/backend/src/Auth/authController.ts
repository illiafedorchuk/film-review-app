import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../Users/user"; // Adjust the import path as necessary
import { AppDataSource } from "../../db/data-source";
import {
  createSendToken,
  signAccessToken,
  signResetPasswordToken,
} from "../Utils/TokenUtils";
import catchAsync from "../Utils/CatchAsync";
import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "46b2190e43cd58",
    pass: "75ea69df48ad2f",
  },
});

interface ExtendedRequest extends Request {
  user?: User;
}
const EmailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

class AuthController {
  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  public refreshToken = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { id: userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }

      const userRepository = AppDataSource.getRepository(User);

      try {
        const user = await userRepository.findOne({
          where: { id: Number(userId) },
          select: ["id", "refreshToken"],
        });

        if (!user || !user.refreshToken) {
          return res
            .status(401)
            .json({ message: "No refresh token available!" });
        }

        jwt.verify(user.refreshToken, process.env.JWT_REFRESH_TOKEN_KEY!);

        // Assuming signAccessToken is a utility function you have that signs JWTs
        // You might need to modify signAccessToken to accept additional parameters for setting a longer duration
        const newAccessToken = signAccessToken(user.id);

        const decoded = jwt.decode(newAccessToken) as JwtPayload;

        return res.status(200).json({
          accessToken: newAccessToken,
          expire: decoded?.exp,
        });
      } catch (error) {
        console.error("Error during refresh token operation:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  );

  public signup = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ message: "Please fill in all fields." });
      }
      if (!EmailValidation.test(email)) {
        return res.status(400).json({ message: "Invalid email address." });
      }

      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        email,
        password: hashedPassword,
        name,
      });

      await userRepository.save(newUser);

      return res.status(201).json({ message: "User created successfully." });
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      try {
        // Find the user by email, including the password for comparison
        const user = await userRepository
          .createQueryBuilder("user")
          .addSelect("user.password") // Explicitly select the password field
          .where("user.email = :email", { email })
          .getOne();

        if (!user) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        // Delegate token creation and sending to the createSendToken utility function
        await createSendToken(user, 200, req, res);
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  );

  public logout = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      try {
        // Get the access token from cookies
        const accessToken = req.cookies.accessToken;
        // If no access token is provided, return an error
        if (!accessToken) {
          return res.status(400).json({ message: "No access token provided." });
        }

        let decoded: JwtPayload;
        try {
          // Verify the access token
          decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_KEY!
          ) as JwtPayload;
        } catch (error) {
          // If token verification fails, return an unauthorized error
          return res.status(401).json({ message: "Invalid token." });
        }

        const userId = decoded.id;
        const userRepository = AppDataSource.getRepository(User);

        // Find the user by their ID
        const user = await userRepository.findOne({
          where: { id: userId },
          select: ["id", "refreshToken"],
        });

        // If user is not found, return an error
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        // Invalidate the refresh token by setting it to null
        user.refreshToken = null;
        await userRepository.save(user);

        // Clear the access token and refresh token cookies
        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure flag only in production
          sameSite: "strict",
          path: "/",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure flag only in production
          sameSite: "strict",
          path: "/",
        });
        console.log("exit");
        return res.status(200).json({ message: "Successfully logged out." });
      } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  );

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email." });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a password reset token
    signResetPasswordToken(user.id);

    const mailOptions = {
      from: "broski@film-app", // Use the provided email as the 'from' address
      to: email, // Adjust the recipient as needed
      subject: `Message from ${email}`,
      text: `http://localhost:5173/resetPassword/${signResetPasswordToken(
        user.id
      )}`,
    };

    try {
      await transport.sendMail(mailOptions);
      return res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Failed to send password reset email." });
    }
  };

  public resetPassword = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { signResetPasswordToken } = req.params;
      const { password } = req.body;
      try {
        const decoded: any = jwt.verify(
          signResetPasswordToken,
          process.env.JWT_RESET_PASSWORD_TOKEN_KEY!
        );
        const userId = decoded.id;
        // Find the user and update the password
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await userRepository.save(user);

        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      } catch (error) {
        console.error("Error during password reset:", error);
        return res.status(500).json({ message: "Failed to reset password." });
      }
    }
  );

  public changePassword = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { oldPassword, newPassword } = req.body;

      // Ensure both old and new passwords are provided
      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Both old and new passwords are required." });
      }

      try {
        // Get the token from cookies
        const token = req.cookies.accessToken;

        if (!token) {
          return res
            .status(401)
            .json({ message: "Unauthorized, no token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(
          token,
          process.env.JWT_ACCESS_TOKEN_KEY!
        ) as JwtPayload;

        // Find the user by decoded token user id
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository
          .createQueryBuilder("user")
          .addSelect("user.password") // Explicitly select the password field for comparison
          .where("user.id = :id", { id: decoded.id })
          .getOne();

        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        // Compare the provided old password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Old password is incorrect." });
        }

        // Hash the new password and update the user record
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await userRepository.save(user);

        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      } catch (error) {
        console.error("Error during password change:", error);
        return res.status(500).json({ message: "Failed to change password." });
      }
    }
  );
}

export const authController = new AuthController();
