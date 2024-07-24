import { Router } from "express";
import { MovieController } from "./movieController";

const router = Router();

router.post("/bookmark", MovieController.bookMovie);
router.put("/unbookmark", MovieController.unbookMovie);
router.post("/add-watchlist", MovieController.addWatchlist);
router.put("/remove-watchlist", MovieController.removeWatchLater);
export default router;
