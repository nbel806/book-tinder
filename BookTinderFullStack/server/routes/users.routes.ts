import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

// POST
// TAKES NAME, EMAIL, PASSWORD
// RETURNS USER
router.post("/", UsersController.createUser);

// GET
// TAKES ID
// RETURNS USER
router.get("/:id", UsersController.getUser);

router.get("/:id/liked", UsersController.getUserLiked);
router.put("/:id/:bookId/liked", UsersController.setUserLikedBook);
router.put("/:id/:bookId/unliked", UsersController.setUserUnlikedBook);

router.get("/:id/seen", UsersController.getUserSeen);
router.put("/:id/:bookId/seen", UsersController.setUserSeenBook);

router.post(
  "/:id/recommended/:numberOfRecommendations",
  UsersController.getUserRecommended
);

// POST
// TAKES JWT
// RETURNS VALID or NOT
router.post("/verify", UsersController.verifyJWT);

// POST
// TAKES EMAIL AND PASSWORD
// RETURNS USER and TOKEN via COOKIE
router.post("/login", UsersController.loginUser);

export default router;
