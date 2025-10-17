import type { RowDataPacket } from "mysql2";
import pool from "./database";
import type { Book } from "../types/types";

interface BookRow extends RowDataPacket {
  book: Book;
}

export class BooksService {
  async getBook(id: number) {
    const [rows] = await pool.query<BookRow[]>(
      `SELECT 
      b.id,
      b.title,
      a.name AS author,
      b.description,
      b.genres,
      b.image
    FROM books b
    LEFT JOIN authors a
      ON JSON_UNQUOTE(JSON_EXTRACT(b.author, '$[0]')) = a.author_key
    WHERE b.id = ?;`,
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
