import jwt from "jsonwebtoken";
import { User } from "../Users/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../../db/data-source";

export const signAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_KEY!, {
    expiresIn: +process?.env?.JWT_ACCESS_TOKEN_EXPIRATION!,
  });
};

export const signRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_KEY!, {
    expiresIn: +process?.env?.JWT_REFRESH_TOKEN_EXPIRATION!,
  });
};

export const signResetPasswordToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_RESET_PASSWORD_TOKEN_KEY!, {
    expiresIn: +process?.env?.JWT_RESET_PASSWORD_TOKEN_EXPIRATION!,
  });
};

export const createSendToken = async (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  user.refreshToken = await bcrypt.hash(refreshToken, 10);
  await AppDataSource.getRepository(User).save(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(statusCode).json({
    user,
  });
};
