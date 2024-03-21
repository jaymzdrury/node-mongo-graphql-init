import bcrypt from "bcrypt";
import { User } from "../schema/user.schema";

export default async function comparePassword(
  user: User,
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
}
