import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./database";
import { BooksService } from "./books.services";
import type { Book, User } from "server/types/types";

interface UserRow extends RowDataPacket {
  user: User;
}
interface BookRow extends RowDataPacket {
  book: Book;
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
    const [rows] = await pool.query<BookRow[]>(
      `SELECT * FROM user_liked_book WHERE user_id = ?`,
      [id]
    );
    return rows;
  }

  async getUserSeen(id: number) {
    const [rows] = await pool.query<BookRow[]>(
      `SELECT * FROM user_seen_book WHERE user_id = ?`,
      [id]
    );
    return rows;
  }

  async getUserRecommendation(id: number, numberOfRecommendations: number) {
    const bookService = new BooksService();
    const readBooks = await this.getUserSeen(id);
    const allBooks: BookRow[] = await bookService.getAllBooks();

    const notReadBooks = allBooks.filter((book) => {
      return !readBooks.some((readBook) => readBook.id === book.id);
    });

    return notReadBooks.slice(0, numberOfRecommendations);
  }
}
