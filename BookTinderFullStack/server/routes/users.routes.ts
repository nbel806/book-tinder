import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.post("/", UsersController.createUser);

router.get("/:id", UsersController.getUser);

router.get("/:id/liked", UsersController.getUserLiked);
router.get("/:id/seen", UsersController.getUserSeen);

router.get(
  "/:id/recommended/:numberOfRecommendations",
  UsersController.getUserRecommended
);

export default router;
