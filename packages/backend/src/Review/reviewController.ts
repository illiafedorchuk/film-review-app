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

    const token = req.cookies.accessToken;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
      console.log("Token decoded:", decoded);
    } catch (error) {
      console.log("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { movie_id: parseInt(movieId) },
    });
    if (!movie) {
      console.log("Movie not found");
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewRepository = AppDataSource.getRepository(Review);
    const newReview = reviewRepository.create({
      userId: user.id,
      movie_id: movie.movie_id,
      rating,
      comment,
      criteriaRatings,
    });
    console.log("New review object created:", newReview);

    try {
      await reviewRepository.save(newReview);
      console.log("Review saved:", newReview);
      res.status(201).json(newReview);
    } catch (error) {
      console.log("Error saving review:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  static getUserReview = catchAsync(async (req: Request, res: Response) => {
    const {
      movie_id,
      title,
      poster_path,
      release_date,
      vote_average,
      genre_ids,
    } = req.body;

    const movieId = parseInt(req.params.movieId); // Ensure correct parsing
    const token = req.cookies.accessToken;

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
      console.log("Token decoded:", decoded);
    } catch (error) {
      console.log("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { movie_id: movieId }, // Use `id` if that's the primary key
    });

    if (!movie) {
      console.log("Movie not found");
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewRepository = AppDataSource.getRepository(Review);
    const reviews = await reviewRepository.find({
      where: { movie_id: movieId, userId: parseInt(userId) },
    });
    console.log("Reviews found:", reviews);
    res.status(200).json(reviews);
  });

  static updateReview = catchAsync(async (req: Request, res: Response) => {
    const { movieId, rating, comment, criteriaRatings } = req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY!) as {
        id: string;
      };
      console.log("Token decoded:", decoded);
    } catch (error) {
      console.log("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;
    const reviewRepository = AppDataSource.getRepository(Review);

    // Find the existing review for the given movie and user
    const review = await reviewRepository.findOne({
      where: { movie_id: parseInt(movieId), userId: parseInt(userId) },
    });

    if (!review) {
      console.log("Review not found");
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the existing review properties
    review.rating = rating;
    review.comment = comment;
    review.criteriaRatings = criteriaRatings;

    try {
      await reviewRepository.save(review);
      console.log("Review updated:", review);
      res.status(200).json(review);
    } catch (error) {
      console.log("Error updating review:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
