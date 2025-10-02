import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./database";
import { BooksService } from "./books.services";

interface UserRow extends RowDataPacket {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
}

export class UsersService {
  async createUser(name: string, email: string, password: string) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)`,
        [name, email, password]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getUser(id: number) {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return rows;
  }

  async getUserLiked(id: number) {
    const [rows] = await pool.query(
      `SELECT * FROM user_liked_book WHERE user_id = ?`,
      [id]
    );
    return rows;
  }

  async getUserSeen(id: number) {
    const [rows] = await pool.query(
      `SELECT * FROM user_seen_book WHERE user_id = ?`,
      [id]
    );
    return rows;
  }

  async getUserRecomendation(id: number, numberOfRecomendations: number) {
    //Implement logic to return books that are not liked by the user but user might like
    //Start with random book user hasnt read.
    const bookService = new BooksService();
    const readBooks = await this.getUserSeen(id);
    const allBooks = await bookService.getAllBooks();

    const notReadBooks = allBooks.filter((book) => {
      return !readBooks.some((readBook) => readBook.id === book.id);
    });

    return notReadBooks.slice(0, numberOfRecomendations);
  }
}
