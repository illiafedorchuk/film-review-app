import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { Movie } from "./movie";
import { User } from "../Users/user";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { ReactionType, FastReactionKey } from "../Interfaces/types";
import { FindOptionsWhere, In } from "typeorm";
import { Review } from "../Review/review";

export class MovieController {
  // Method to add a movie to the database
  static addMovieToDatabase = catchAsync(
    async (req: Request, res: Response) => {
      const {
        movie_id,
        title,
        poster_path,
        backdrop_path,
        release_date,
        vote_average,
        genre_ids,
      } = req.body;

      console.log("Received data in backend:", req.body);

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
          backdrop_path,
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
    user.updatedAt = new Date();
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
    user.updatedAt = new Date();
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
    user.updatedAt = new Date();
    user.watchLaterMovies.push(movie.movie_id);
    user.updatedAt = new Date();
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
    user.updatedAt = new Date();
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
    user.updatedAt = new Date();
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

  static getWatchLaterMovies = catchAsync(
    async (req: Request, res: Response) => {
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

      const movieRepository = AppDataSource.getRepository(Movie);

      // Fetch full movie details using the findBy method and In operator
      const watchLaterMovies = await movieRepository.findBy({
        movie_id: In(user.watchLaterMovies),
      });

      return res.status(200).json({
        watchLaterMovies,
      });
    }
  );

  static getRatedMovies = catchAsync(async (req: Request, res: Response) => {
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
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    // Find the user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has rated movies
    if (!user.ratedMovies || user.ratedMovies.length === 0) {
      return res.status(200).json({ ratedMovies: [] });
    }

    const movieRepository = AppDataSource.getRepository(Movie);

    try {
      // Fetch full movie details and user ratings using a join between Movie and Review
      const ratedMovies = await movieRepository
        .createQueryBuilder("movie")
        .innerJoinAndSelect(
          "review",
          "review",
          "review.movie_id = movie.movie_id AND review.userId = :userId",
          { userId }
        )
        .select([
          "movie.movie_id",
          "movie.title",
          "movie.poster_path",
          "movie.backdrop_path",
          "review.rating AS movieRating",
        ])
        .where("movie.movie_id IN (:...movieIds)", {
          movieIds: user.ratedMovies,
        })
        .getRawMany();

      return res.status(200).json({
        ratedMovies,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch rated movies" });
    }
  });

  static getBookmarkedMovies = catchAsync(
    async (req: Request, res: Response) => {
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

      const movieRepository = AppDataSource.getRepository(Movie);

      // Fetch full movie details using the findBy method and In operator
      const bookmarkedMovies = await movieRepository.findBy({
        movie_id: In(user.bookmarkedMovies),
      });
      return res.status(200).json({
        bookmarkedMovies,
      });
    }
  );
}
