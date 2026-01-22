import { Router } from "express";
import { authenticate } from "../middleawares/token";
import { getLikes } from "../features/like/like.controller";

const router = Router();

router.post("/like/:id", authenticate, getLikes);

export default router;
