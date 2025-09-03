export default function registerUser(
  email: string,
  password: string,
  confirmPassword: string
) {
  {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  }
  //add db connection
}
