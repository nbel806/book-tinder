import pool from "./database";

export class BooksService {
  async getBook(id: number) {
    const [rows] = await pool.query(`SELECT * FROM books WHERE id = ?`, [id]);
    return rows;
  }
}
