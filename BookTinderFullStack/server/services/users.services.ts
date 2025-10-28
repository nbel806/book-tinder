import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./database";
import type { Book, User } from "server/types/types";
import bcrypt from "bcryptjs";
import axios from "axios";

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

  async getUserRecommendation(
    userId: number,
    numberOfRecommendations: number,
    excludedIds: number[]
  ) {
    // Prepare placeholders for excludedIds
    const excludedPlaceholders = excludedIds.map(() => "?").join(",");

    // SQL query
    const sql = `
    SELECT 
      b.id,
      b.title,
      a.name AS author,
      b.description,
      b.genres,
      b.image
    FROM books b
    LEFT JOIN authors a
      ON JSON_UNQUOTE(JSON_EXTRACT(b.author, '$[0]')) = a.author_key
    WHERE b.id NOT IN (
      SELECT book_id
      FROM user_seen_book
      WHERE user_id = ?
    )
    ${excludedIds.length ? `AND b.id NOT IN (${excludedPlaceholders})` : ""}
    LIMIT ?
    `;

    // Build query parameters: first userId, then excludedIds, then limit
    const params: Array<number> = [
      userId,
      ...excludedIds,
      numberOfRecommendations,
    ];

    // Execute query
    const [recommendedBooks] = await pool.query<BookRow[]>(sql, params);

    return recommendedBooks;
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

  async getFaissRecommendations(userId: number, topK = 10) {
    try {
      const res = await axios.get(`http://0.0.0.0:8000/recommend/${userId}`, {
        params: { top_k: topK },
      });
      return res.data.recommended_book_ids; // array of book IDs
    } catch (err) {
      console.error("Error fetching FAISS recommendations:", err);
      return [];
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
