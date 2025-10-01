import pool from "./database";

export class UsersService {
  // async createUser(name: string, email: string, password: string) {
  //   const [result] = await pool.query(
  //     `INSERT INTO users (user_name, email, user_password) VALUES (?, ?, ?)`,
  //     [name, email, password]
  //   );
  //   return result.insertId;
  // }

  async getUser(id: number) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows;
  }
}
