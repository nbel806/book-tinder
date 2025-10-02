import { Router } from "express";
import bookRoutes from "./books.routes";
import userRoutes from "./users.routes";

const router = Router();

router.use("/books", bookRoutes);
router.use("/users", userRoutes);

export default router;
