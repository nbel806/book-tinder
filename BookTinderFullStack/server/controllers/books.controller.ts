import type { Request, Response } from "express";
import { BooksService } from "../services/books.services";
import { seedBooks } from "server/services/seedBooks";

const booksService = new BooksService();

export class BooksController {
  static async getBook(req: Request, res: Response) {
    const { id } = req.params;
    const book = await booksService.getBook(Number.parseInt(id));
    res.status(200).json(book);
  }

  static async seed(req: Request, res: Response) {
    seedBooks();
    res.status(200).json({ message: "Seed successful" });
  }
}
