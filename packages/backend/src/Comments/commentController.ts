import { Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { Movie } from "../Movies/movie";
import { User } from "../Users/user";
import { Comment } from "./comment";
import catchAsync from "../Utils/CatchAsync";
import jwt from "jsonwebtoken";
import { FindOptionsWhere } from "typeorm";

export class CommentController {
  static createComment = catchAsync(async (req: Request, res: Response) => {
    const { text } = req.body;
    const movieId = parseInt(req.params.movieId);
    console.log(movieId, text);
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

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = commentRepository.create({
      userId: parseInt(userId),
      movie_id: movieId,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
      like_count: 0,
      dislike_count: 0,
    });

    await commentRepository.save(comment);

    return res.status(201).json({ message: "Comment created" });
  });

  static getComments = catchAsync(async (req: Request, res: Response) => {
    const { movieId } = req.params;

    const commentRepository = AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({
      where: { movie_id: parseInt(movieId) },
    });

    return res.status(200).json({ comments });
  });

  static likeComment = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
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

    const userId = parseInt(decoded.id);

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user already liked the comment
    if (comment.user_likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already liked this comment" });
    }

    // Remove user from dislikes if present
    comment.user_dislikes = comment.user_dislikes.filter((id) => id !== userId);

    // Add user to likes
    comment.user_likes.push(userId);
    comment.like_count = comment.user_likes.length;
    comment.dislike_count = comment.user_dislikes.length;

    await commentRepository.save(comment);

    return res
      .status(200)
      .json({ message: "Like added", like_count: comment.like_count });
  });

  static dislikeComment = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
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

    const userId = parseInt(decoded.id);

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user already disliked the comment
    if (comment.user_dislikes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already disliked this comment" });
    }

    // Remove user from likes if present
    comment.user_likes = comment.user_likes.filter((id) => id !== userId);

    // Add user to dislikes
    comment.user_dislikes.push(userId);
    comment.like_count = comment.user_likes.length;
    comment.dislike_count = comment.user_dislikes.length;

    await commentRepository.save(comment);

    return res
      .status(200)
      .json({ message: "Dislike added", dislike_count: comment.dislike_count });
  });
}
