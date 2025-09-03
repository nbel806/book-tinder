export function validateLogin(email: string, password: string) {
  {
    if (email.match("nathan@gmail.com")) {
      return password.match("password");
    }
    return false;
  }
  //add db connection
}
