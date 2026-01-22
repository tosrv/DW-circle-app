import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middleawares/async";
import { findUsers } from "./user.repository";

// All user
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const users = await findUsers(userId);

    res.status(200).json({
      status: "success",
      data: users,
    });
  },
);
