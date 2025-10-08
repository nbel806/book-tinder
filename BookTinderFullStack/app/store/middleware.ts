async function verifyToken(token: string) {
  try {
    const res = await fetch("/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": token,
      },
    });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
