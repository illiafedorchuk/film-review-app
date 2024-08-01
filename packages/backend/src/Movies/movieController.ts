import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { Movie } from "./movie";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";

export class MovieController {
  // Method to add a movie to the database
  static addMovieToDatabase = catchAsync(
    async (req: Request, res: Response) => {
      const {
        movie_id,
        title,
        poster_path,
        release_date,
        vote_average,
        genre_ids,
      } = req.body;

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

      console.log("User found:", user);

      // Get movie repository
      const movieRepository = AppDataSource.getRepository(Movie);

      // Check if the movie already exists in the database
      let movie = await movieRepository.findOne({ where: { movie_id } });
      if (!movie) {
        // If not, create a new movie
        movie = movieRepository.create({
          movie_id,
          title,
          poster_path,
          release_date,
          vote_average,
          genre_ids,
        });
        await movieRepository.save(movie);
        console.log("Movie saved:", movie);

        res
          .status(200)
          .json({ message: "Movie added to database successfully" });
      } else {
        res
          .status(200)
          .json({ message: "Movie already exists in the database" });
      }
    }
  );

  static bookMovie = catchAsync(async (req: Request, res: Response) => {
    const {
      movie_id,
      title,
      poster_path,
      release_date,
      vote_average,
      genre_ids,
    } = req.body;

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

    console.log("User found:", user);

    // Get movie repository
    const movieRepository = AppDataSource.getRepository(Movie);

    // Check if the movie already exists in the database
    let movie = await movieRepository.findOne({ where: { movie_id } });
    if (!movie) {
      // If not, create a new movie
      movie = movieRepository.create({
        movie_id,
        title,
        poster_path,
        release_date,
        vote_average,
        genre_ids,
      });
      await movieRepository.save(movie);
      console.log("Movie saved:", movie);
    } else {
    }

    // Update user's bookmarked movies list
    if (!user.bookmarkedMovies) {
      user.bookmarkedMovies = [];
    }

    user.bookmarkedMovies.push(movie.movie_id);

    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Movie bookmark status updated successfully" });
  });

  // UNBOOK MOVIE
  static unbookMovie = catchAsync(async (req: Request, res: Response) => {
    const { movie_id } = req.body;
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

    // Update user's bookmarked movies list
    user.bookmarkedMovies = user.bookmarkedMovies.filter(
      (movie) => movie != movie_id
    );

    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Movie removed from bookmarks successfully" });
  });

  static addWatchlist = catchAsync(async (req: Request, res: Response) => {
    const {
      movie_id,
      title,
      poster_path,
      release_date,
      vote_average,
      genre_ids,
    } = req.body;

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

    console.log("User found:", user);

    // Get movie repository
    const movieRepository = AppDataSource.getRepository(Movie);

    // Check if the movie already exists in the database
    let movie = await movieRepository.findOne({ where: { movie_id } });
    if (!movie) {
      // If not, create a new movie
      movie = movieRepository.create({
        movie_id,
        title,
        poster_path,
        release_date,
        vote_average,
        genre_ids,
      });
      await movieRepository.save(movie);
    } else {
    }

    // Update user's bookmarked movies list
    if (!user.watchLaterMovies) {
      user.watchLaterMovies = [];
    }

    user.watchLaterMovies.push(movie.movie_id);

    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Movie bookmark status updated successfully" });
  });

  static removeWatchLater = catchAsync(async (req: Request, res: Response) => {
    const { movie_id } = req.body;
    console.log("Received movie_id:", movie_id); // Debug log

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

    console.log(
      "User's watchLaterMovies before removal:",
      user.watchLaterMovies
    ); // Debug log

    // Update user's watchLaterMovies list
    user.watchLaterMovies = user.watchLaterMovies.filter(
      (movie) => movie != movie_id
    );

    console.log(
      "User's watchLaterMovies after removal:",
      user.watchLaterMovies
    ); // Debug log

    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Movie removed from watchlist successfully" });
  });
}
