import { Router } from "express";
import { CommentController } from "./commentController";

const router = Router();

router.post("/:movieId/create", CommentController.createComment);
router.get("/:movieId", CommentController.getComments);
router.post("/:commentId/like", CommentController.likeComment);
router.post("/:commentId/dislike", CommentController.dislikeComment);
router.get(
  "/:commentId/getLikesAndDislikes",
  CommentController.getCommentLikesAndDislike
);
export default router;
