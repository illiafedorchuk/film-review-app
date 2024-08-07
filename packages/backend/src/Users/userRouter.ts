import { Router } from "express";
import { UserController } from "./userController";

const router = Router();

router.get("/bookmarked-movies", UserController.getBookmarkedMovies);
router.get("/watchlist", UserController.getMovieWatchlist);

export default router;
