import { Router } from "express";
import BookController from "../controllers/book.controller";

const router = Router();

router.get("/:id", BookController.getBook);

export default router;
