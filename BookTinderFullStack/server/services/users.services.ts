import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./database";
import { BooksService } from "./books.services";
import type { Book, User } from "server/types/types";
import bcrypt from "bcryptjs";

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
        const user = await this.getUserByEmail(email);
        return user;
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
    return rows[0];
  }

  async getUserByEmail(email: string) {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
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
    const seenBooks = await this.getUserSeen(id);
    const allBooks: BookRow[] = await bookService.getAllBooks();

    const notReadBooks = allBooks.filter((book) => {
      return !seenBooks.some((seenBook) => seenBook.book_id === book.id);
    });

    return notReadBooks.slice(0, numberOfRecommendations);
  }

  async updateUserBookLiked(id: string, bookId: string, bookLiked: boolean) {
    try {
      if (bookLiked) {
        await pool.query<BookRow[]>(
          `INSERT INTO user_liked_book (user_id, book_id) VALUES (?, ?); `,
          [id, bookId]
        );
      } else {
        await pool.query<BookRow[]>(
          `DELETE FROM user_liked_book WHERE user_id = ? AND book_id = ?`,
          [id, bookId]
        );
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async updateUserBookSeen(id: string, bookId: string, bookSeen: boolean) {
    try {
      if (bookSeen) {
        await pool.query<BookRow[]>(
          `INSERT INTO user_seen_book (user_id, book_id) VALUES (?, ?); `,
          [id, bookId]
        );
      } else {
        await pool.query<BookRow[]>(
          `DELETE FROM user_seen_book WHERE user_id = ? AND book_id = ?`,
          [id, bookId]
        );
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
async function verfiyPassword(user_password: string, password: string) {
  const isMatch = await bcrypt.compare(password, user_password);
  return isMatch;
}

async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
