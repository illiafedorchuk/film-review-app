import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { watch } from "fs";

export class UserController {
  static getBookmarkedMovies = catchAsync(
    async (req: Request, res: Response) => {
      // Extract access token from cookies
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Decode token to get user ID
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
          id: string;
        };
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.id;

      // Get user repository
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: parseInt(userId) },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        bookmarkedMovies: user!.bookmarkedMovies,
      });
    }
  );

  static getMovieWatchlist = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      watchLaterMovies: user!.watchLaterMovies,
    });
  });

  static getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      country: user.country,
      aboutMe: user.aboutMe,
      avatarUrl: user.avatarUrl,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      recentActivity: user.recentActivity,
      watchLaterMovies: user.watchLaterMovies,
      bookmarkedMovies: user.bookmarkedMovies,
    });
  });

  static getProfileInfo = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      aboutMe: user.aboutMe,
      country: user.country,
      recentActivity: user.recentActivity,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      watchLaterMovies: user.watchLaterMovies,
      bookmarkedMovies: user.bookmarkedMovies,
    });
  });

  static editProfile = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    const { name, avatarUrl, aboutMe, country } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    user.name = name;
    user.avatarUrl = avatarUrl;
    user.aboutMe = aboutMe;
    user.updatedAt = new Date();
    user.country = country;
    await userRepository.save(user);

    return res.status(200).json({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      watchLaterMovies: user.watchLaterMovies,
      bookmarkedMovies: user.bookmarkedMovies,
    });
  });
}
