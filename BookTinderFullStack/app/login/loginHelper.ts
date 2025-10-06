export async function validateLogin(email: string, password: string) {
  {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
}
