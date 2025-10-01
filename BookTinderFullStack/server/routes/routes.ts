import { Router } from "express";
import bookRoutes from "./books.routes";
import userRoutes from "./users.routes";

const router = Router();

router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
