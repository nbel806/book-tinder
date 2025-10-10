import type { RowDataPacket } from "mysql2";
import pool from "./database";
import type { Book } from "../types/types";

interface BookRow extends RowDataPacket {
  book: Book;
}

export class BooksService {
  async getBook(id: number) {
    const [rows] = await pool.query<BookRow[]>(
      `SELECT * FROM books WHERE id = ?`,
      [id]
    );
    return rows;
  }

  async getAllBooks() {
    const [rows] = await pool.query<BookRow[]>(`SELECT * FROM books`);
    return rows;
  }

  async getBookByTitle(title: string) {
    const [rows] = await pool.query<BookRow[]>(
      `SELECT * FROM books WHERE title = ?`,
      [title]
    );
    return rows;
  }
}
