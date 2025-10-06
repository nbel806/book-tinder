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
      const hashedPassword = await hashPassword(password);
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const [rows] = await pool.query<UserRow[]>(
        `SELECT user_password FROM users WHERE email = ?`,
        [email]
      );
      if (await verfiyPassword(rows[0].user_password, password)) {
        return rows;
      } else {
        throw new Error("Invalid login info");
      }
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

  async getUserByEmail(email: string) {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
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
async function verfiyPassword(user_password: string, password: string) {
  const bycrypt = require("bcrypt");
  const isMatch = await bycrypt.compare(password, user_password);
  return isMatch;
}

async function hashPassword(password: string) {
  const bycrypt = require("bcrypt");
  const saltRounds = 10;
  const hashedPassword = await bycrypt.hash(password, saltRounds);
  return hashedPassword;
}
