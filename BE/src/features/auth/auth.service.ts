import bcrypt from "bcrypt";
import { LoginDTO, RegisterDTO } from "../../types/auth";
import { AppError } from "../../utils/error";
import { adduser, findEmail, findUser } from "./auth.repository";
import { signToken } from "../../utils/jwt";

// Registration
export async function createUser(userData: RegisterDTO) {
  const username = await findUser(userData.username);
  if (username) throw new AppError(409, "Username already used");

  const email = await findEmail(userData.email);
  if (email) throw new AppError(409, "Email already registered");

  const hashPass = await bcrypt.hash(userData.password, 10);
  return await adduser({
    username: userData.username,
    fullname: userData.fullname,
    email: userData.email,
    password: hashPass,
  });
}

// Login
export async function getUser(userData: LoginDTO) {
  const user = await findEmail(userData.email);
  if (!user) throw new AppError(400, "Invalid email or password!");

  const match = await bcrypt.compare(userData.password, user.password);

  if (!match) throw new AppError(400, "Invalid email or password");

  const { id, username } = user;
  return signToken({ id, username });
}
