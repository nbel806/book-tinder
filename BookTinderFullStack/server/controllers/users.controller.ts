import type { Request, Response } from "express";
import { UsersService } from "../services/users.services";

const usersService = new UsersService();

export class UsersController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await usersService.getUser(Number.parseInt(id));
    res.status(200).json(user);
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const existingUser = await usersService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await usersService.createUser(name, email, password);
    res.status(201).json(user);
  }

  static async getUserLiked(req: Request, res: Response) {
    const { id } = req.params;
    const likedBooks = await usersService.getUserLiked(Number.parseInt(id));
    res.status(200).json(likedBooks);
  }

  static async getUserSeen(req: Request, res: Response) {
    const { id } = req.params;
    const seenBooks = await usersService.getUserSeen(Number.parseInt(id));
    res.status(200).json(seenBooks);
  }

  static async getUserRecommended(req: Request, res: Response) {
    const { id, numberOfRecommendations } = req.params;
    const recommendedBooks = await usersService.getUserRecommendation(
      Number.parseInt(id),
      Number.parseInt(numberOfRecommendations)
    );
    res.status(200).json(recommendedBooks);
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    let user;
    try {
      user = await usersService.loginUser(email, password);
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Invalid login info" });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid login info" });
    }
  }
}
