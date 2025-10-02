import { Router } from "express";
import { BooksController } from "../controllers/books.controller";

const router = Router();

router.get("/:id", BooksController.getBook);

export default router;
