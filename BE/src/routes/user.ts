import { Router } from "express";
import { getUsers } from "../features/user/user.controller";
import { authenticate } from "../middleawares/token";

const router = Router();

router.get("/users", authenticate, getUsers);

export default router;
