import { Router, Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middleawares/async";
import { validate } from "../../middleawares/validate";
import { loginSchema, registerSchema } from "../../validations/auth";
import { createUser, getUser } from "./auth.service";
import { authenticate } from "../../middleawares/token";

const router = Router();

// Registration
router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);
    res.status(201).json({
      status: "success",
      message: "Registration successful, please login",
      data: user,
    });
  }),
);

// Login
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = await getUser(req.body);

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
  }),
);

// First page
router.get(
  "/me",
  authenticate,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ user: (req as any).user });
  }),
);

// Logout
router.post(
  "/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      message: "Logout"
    })
  }),
);

export default router;
