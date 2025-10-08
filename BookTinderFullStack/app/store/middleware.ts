export async function verifyToken() {
  try {
    const res = await fetch("http://localhost:3000/api/users/verify", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
