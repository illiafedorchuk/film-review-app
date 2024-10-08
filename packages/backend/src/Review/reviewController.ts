import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { Review } from "./review";
import { Movie } from "../Movies/movie";

export class ReviewController {
  static createReview = catchAsync(async (req: Request, res: Response) => {
    const {
      movieId,
      rating,
      comment,
      criteriaRatings,
      title,
      poster_path,
      backdrop_path,
      release_date,
      vote_average,
      genre_ids,
    } = req.body;

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

    const userId = +decoded.id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    // Check if the user exists before proceeding
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movieRepository = AppDataSource.getRepository(Movie);

    let movie = await movieRepository.findOne({
      where: { movie_id: parseInt(movieId) },
    });

    if (!movie) {
      movie = movieRepository.create({
        movie_id: movieId,
        title,
        poster_path: poster_path.startsWith("https://")
          ? poster_path.replace("https://image.tmdb.org/t/p/original", "")
          : poster_path, // Strip full URL if present
        backdrop_path: backdrop_path.startsWith("https://")
          ? backdrop_path.replace("https://image.tmdb.org/t/p/original", "")
          : backdrop_path, // Strip full URL if present,
        release_date,
        vote_average,
        genre_ids,
      });

      await movieRepository.save(movie);
    }

    const reviewRepository = AppDataSource.getRepository(Review);

    const newReview = reviewRepository.create({
      userId: user.id,
      movie_id: movie.movie_id,
      rating,
      comment,
      criteriaRatings,
    });

    // Update user's bookmarked movies list
    if (!user.ratedMovies) {
      user.ratedMovies = [];
    }
    user.updatedAt = new Date(); // Update the timestamp
    user.ratedMovies.push(movie.movie_id);

    // Initialize recentActivity if undefined
    if (!user.recentActivity) {
      user.recentActivity = [];
    }

    // Ensure recentActivity has a maximum of 2 items
    if (user.recentActivity.length >= 2) {
      user.recentActivity.shift(); // Remove the oldest activity
    }

    // Add the new activity to recentActivity
    user.recentActivity.push(`You add a review for ${movie?.title}`);

    // Make sure that user is not null when saving
    try {
      await userRepository.save(user); // This is safe since we already checked for null
      await reviewRepository.save(newReview);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  static getUserReview = catchAsync(async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.movieId); // Ensure correct parsing
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

    const userId = +decoded.id;

    const reviewRepository = AppDataSource.getRepository(Review);
    const reviews = await reviewRepository.find({
      where: { movie_id: movieId, userId: userId },
    });
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
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = +decoded.id;
    const reviewRepository = AppDataSource.getRepository(Review);

    // Find the existing review for the given movie and user
    const review = await reviewRepository.findOne({
      where: { movie_id: parseInt(movieId), userId: userId },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the existing review properties
    review.rating = rating;
    review.comment = comment;
    review.criteriaRatings = criteriaRatings;

    try {
      await reviewRepository.save(review);
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  static deleteReview = catchAsync(async (req: Request, res: Response) => {
    const { reviewId } = req.params;
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

    const userId = +decoded.id;
    const reviewRepository = AppDataSource.getRepository(Review);
    const movieRepository = AppDataSource.getRepository(Movie);

    // Find the review and corresponding movie
    const review = await reviewRepository.findOne({
      where: { id: parseInt(reviewId), userId: userId },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const movie = await movieRepository.findOne({
      where: { movie_id: review.movie_id },
    });

    try {
      await reviewRepository.remove(review);

      // Find the user and update recentActivity
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Initialize recentActivity if undefined
      if (!user.recentActivity) {
        user.recentActivity = [];
      }

      // Ensure recentActivity has a maximum of 2 items
      if (user.recentActivity.length >= 2) {
        user.recentActivity.shift();
      }

      // Add the new activity to recentActivity
      user.recentActivity.push(`You deleted a review for ${movie?.title}`);
      user.updatedAt = new Date(); // Update the timestamp
      await userRepository.save(user);

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
