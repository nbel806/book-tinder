import { Router } from "express";
import { BooksController } from "../controllers/books.controller";

const router = Router();

router.get("/:id", BooksController.getBook);

// router.post("/seed", BooksController.seed);

export default router;
