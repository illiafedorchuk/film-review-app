import { Router } from "express";
import { ReviewController } from "./reviewController";

const router = Router();

router.post("/add-review", ReviewController.createReview);
router.get("/get-user-review/:movieId", ReviewController.getUserReview);
router.patch("/update-review", ReviewController.updateReview);
export default router;
