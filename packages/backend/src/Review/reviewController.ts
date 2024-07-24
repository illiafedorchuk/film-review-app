import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { Review } from "./review";
import { Movie } from "../Movies/movie";

export class ReviewController {
  static createReview = catchAsync(async (req: Request, res: Response) => {
    const { movieId, rating, comment, criteriaRatings } = req.body;

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

    // Get movie repository
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({ where: { id: movieId } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Get review repository
    const reviewRepository = AppDataSource.getRepository(Review);
    const newReview = reviewRepository.create({
      userId: user.id,
      movieId: movie.id,
      rating: rating,
      comment: comment,
      criteriaRatings: criteriaRatings,
    });

    await reviewRepository.save(newReview);
    res.status(201).json(newReview);
  });
}
