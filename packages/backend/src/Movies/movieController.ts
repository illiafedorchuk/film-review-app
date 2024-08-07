import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { Movie } from "./movie";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { ReactionType, FastReactionKey } from "../Interfaces/types";
import { FindOptionsWhere } from "typeorm";

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

    // Update user's watchLaterMovies list
    user.watchLaterMovies = user.watchLaterMovies.filter(
      (movie) => movie != movie_id
    );


    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Movie removed from watchlist successfully" });
  });

  static addFastReaction = catchAsync(async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { reactionType } = req.body;

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
    const movie = await movieRepository.findOne({
      where: { movie_id: parseInt(movieId) } as FindOptionsWhere<Movie>, // Correct typing here
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const fastReactions = movie.fastReactions || {
      like_count: 0,
      love_count: 0,
      smile_count: 0,
      wow_count: 0,
      sad_count: 0,
      angry_count: 0,
    };

    const reactionKey: FastReactionKey =
      `${reactionType}_count` as FastReactionKey;

    if (MovieController.userReactionExists(user, parseInt(movieId))) {
      // If the user already reacted, remove the previous reaction
      const previousReactionType = MovieController.getPreviousReaction(
        user,
        parseInt(movieId)
      );
      if (previousReactionType) {
        const previousReactionKey: FastReactionKey =
          `${previousReactionType}_count` as FastReactionKey;
        fastReactions[previousReactionKey]--;
      }
      if (previousReactionType === reactionType) {
        // If the reaction is the same, unset the reaction
        MovieController.removeUserReaction(user, parseInt(movieId));
      } else {
        // Otherwise, set the new reaction
        MovieController.setUserReaction(
          user,
          parseInt(movieId),
          reactionType as ReactionType
        );
        fastReactions[reactionKey]++;
      }
    } else {
      // Add new reaction
      MovieController.setUserReaction(
        user,
        parseInt(movieId),
        reactionType as ReactionType
      );
      fastReactions[reactionKey]++;
    }

    movie.fastReactions = fastReactions;
    await movieRepository.save(movie);
    await userRepository.save(user);

    return res.status(200).json(movie.fastReactions);
  });

  static getReaction = catchAsync(async (req: Request, res: Response) => {
    const { movieId } = req.params;

    // Get movie repository
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { movie_id: parseInt(movieId) } as FindOptionsWhere<Movie>, // Correct typing here
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(
      movie.fastReactions || {
        like_count: 0,
        love_count: 0,
        smile_count: 0,
        wow_count: 0,
        sad_count: 0,
        angry_count: 0,
      }
    );
  });

  // Helper methods to manage user's reactions
  static userReactionExists(user: User, movieId: number): boolean {
    return user.reactions && movieId in user.reactions;
  }

  static getPreviousReaction(user: User, movieId: number): ReactionType | null {
    return user.reactions ? user.reactions[movieId] : null;
  }

  static setUserReaction(
    user: User,
    movieId: number,
    reactionType: ReactionType
  ) {
    if (!user.reactions) {
      user.reactions = {};
    }
    user.reactions[movieId] = reactionType;
  }

  static removeUserReaction(user: User, movieId: number) {
    if (user.reactions) {
      delete user.reactions[movieId];
    }
  }

}
