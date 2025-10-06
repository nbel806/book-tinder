import jwt from "jsonwebtoken";

export function signJwt(email: string) {
  const data = { time: Date.now(), email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const accessToken = jwt.sign(data, secret);
  return accessToken;
}

export function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, secret);
}
