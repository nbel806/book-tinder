export class UsersService {


  async getAllUsers() {
    try {
        const [rows] = await 
    } catch (err) {
        console.error(err);
        return 
    }
    return 
  }

  async createUser(name: string, email: string) {
    return db.user.create({ data: { name, email } });
  }
}
