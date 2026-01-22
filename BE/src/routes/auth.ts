import { Router } from "express";
import { validate } from "../middleawares/validate";
import { loginSchema, registerSchema } from "../validations/auth";
import {
  createUser,
  getUser,
  logout,
  sendUser,
} from "../features/auth/auth.controller";
import { authenticate } from "../middleawares/token";

const router = Router();

router.post("/register", validate(registerSchema), createUser);
router.post("/login", validate(loginSchema), getUser);
router.get("/me", authenticate, sendUser);
router.post("/logout", authenticate, logout);

export default router;
