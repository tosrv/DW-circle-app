import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/error";
import { adduser, findEmail, findUser } from "./auth.repository";
import { signToken } from "../../utils/jwt";
import { asyncHandler } from "../../middleawares/async";

// Registration
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, fullname, email, password } = req.body;

    console.log(req.body);

    if (await findUser(username))
      throw new AppError(409, "Username already used");
    if (await findEmail(email))
      throw new AppError(409, "Email already registered");

    const hashPass = await bcrypt.hash(password, 10);
    const user = await adduser({
      username,
      fullname,
      email,
      password: hashPass,
    });

    res.status(201).json({
      status: "success",
      message: "Registration successful, please login",
      data: user,
    });
  },
);

// Login
export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await findEmail(email);
    if (!user) throw new AppError(400, "Invalid email or password!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError(400, "Invalid email or password");

    const { id, username } = user;
    const token = signToken({ id, username });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Logged in",
      data: token,
    });
  },
);

// Send user data
export const sendUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUser((req as any).user.username);

    res.status(200).json({ user: user });
  },
);

// Logout
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      message: "Logout",
    });
  },
);
