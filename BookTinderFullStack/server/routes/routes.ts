import { Router } from "express";
import bookRoutes from "./books.routes";
import userRoutes from "./users.routes";

const router = Router();

router.get("/book", bookRoutes);
router.get("/api", userRoutes);

export default router;
