import jwt from "jsonwebtoken";

const key = <string>process.env.KEY;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, key, { ...(options && options) });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, key) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
