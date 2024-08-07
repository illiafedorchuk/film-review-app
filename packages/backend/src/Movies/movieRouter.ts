// movieRouter.ts
import { Router } from "express";
import { MovieController } from "./movieController";

const router = Router();

router.post("/bookmark", MovieController.bookMovie);
router.put("/unbookmark", MovieController.unbookMovie);
router.post("/add-watchlist", MovieController.addWatchlist);
router.put("/remove-watchlist", MovieController.removeWatchLater);
router.post("/add", MovieController.addMovieToDatabase);

// Add these routes for reactions
router.get("/:movieId/reactions", MovieController.getReaction); // Ensure this line exists
router.post("/:movieId/react", MovieController.addFastReaction);

export default router;
