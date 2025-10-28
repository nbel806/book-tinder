import type { Request, Response } from "express";
import { UsersService } from "../services/users.services";
import { signJwt, verifyJwt } from "server/services/jwt";
import { BooksService } from "server/services/books.services";

const usersService = new UsersService();
const booksService = new BooksService();

export class UsersController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await usersService.getUser(Number.parseInt(id));
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const userTaken = await usersService.getUserByEmail(email);
      if (userTaken && userTaken.id > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user_id = await usersService.createUser(name, email, password);
      const user = await usersService.loginUser(email, password);
      if (user_id && user) {
        const token = signJwt(email);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        return res.status(201).json({ user });
      }
    } catch {
      return res.status(400).json({ message: "Error Registering User" });
    }
  }

  static async getUserLiked(req: Request, res: Response) {
    const { id } = req.params;
    const listOfLikedBookIds = await usersService.getUserLiked(
      Number.parseInt(id)
    );

    const likedBooks = await Promise.all(
      listOfLikedBookIds.map(async (likedBook) => {
        const book = await booksService.getBook(likedBook.book_id);
        return book;
      })
    );

    res.status(200).json(likedBooks.flat());
  }

  static async getUserSeen(req: Request, res: Response) {
    const { id } = req.params;
    const seenBooks = await usersService.getUserSeen(Number.parseInt(id));
    res.status(200).json(seenBooks);
  }

  static async getUserRecommended(req: Request, res: Response) {
    try {
      const { id, numberOfRecommendations } = req.params;
      const { excludedIds } = req.body;

      if (
        !Array.isArray(excludedIds) ||
        !excludedIds.every(
          (val) => typeof val === "number" && Number.isFinite(val)
        )
      ) {
        return res
          .status(400)
          .json({ message: "excludedIds must be an array of numbers" });
      }

      // Get recommended book IDs from microservice
      const faissRecommendedIds = await usersService.getFaissRecommendations(
        Number.parseInt(id),
        Number.parseInt(numberOfRecommendations)
      );

      console.log("FAISS Recommended IDs:", faissRecommendedIds);

      // Remove any excluded IDs
      const filteredIds: number[] = faissRecommendedIds.filter(
        (bid: number) => !excludedIds.includes(bid)
      );

      if (!filteredIds.length) return res.status(200).json([]);

      // Fetch full book info from DB
      const recommendedBooks = await Promise.all(
        filteredIds.map(async (bookId) => {
          const book = await booksService.getBook(bookId);
          return book;
        })
      );

      res.status(200).json(recommendedBooks.flat());
    } catch (err) {
      console.error("Error in getUserRecommended:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    let user;
    try {
      user = await usersService.loginUser(email, password);
      if (user) {
        const token = signJwt(email);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: "Invalid login info" });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid login info" });
    }
  }

  static async verifyJWT(req: Request, res: Response) {
    try {
      const token = req.cookies["jwt"];
      if (token && typeof token === "string") {
        if (verifyJwt(token)) {
          res.status(200).json({ message: "Valid token" });
        }
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid token" });
    }
  }

  static async setUserUnlikedBook(req: Request, res: Response) {
    const { id, bookId } = req.params;
    if (await usersService.updateUserBookLiked(id, bookId, false)) {
      res.status(200).json({ message: "Book unliked" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  }
  static async setUserLikedBook(req: Request, res: Response) {
    const { id, bookId } = req.params;
    if (await usersService.updateUserBookLiked(id, bookId, true)) {
      res.status(200).json({ message: "Book liked" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  }

  static async setUserSeenBook(req: Request, res: Response) {
    const { id, bookId } = req.params;
    if (await usersService.updateUserBookSeen(id, bookId, true)) {
      res.status(200).json({ message: "Book seen" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  }
}
