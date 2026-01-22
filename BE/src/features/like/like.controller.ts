import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middleawares/async";
import { prisma } from "../../prisma/client";
import { broadcastEvent } from "../../sockets/websocket";

export const getLikes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = Number((req as any).user.id);
    const threadId = Number(req.params.id);

    const existingLike = await prisma.likes.findUnique({
      where: {
        user_id_thread_id: {
          user_id: user,
          thread_id: threadId,
        },
      },
    });

    let isLiked: boolean;
    if (existingLike) {
      await prisma.likes.delete({
        where: {
          user_id_thread_id: {
            user_id: user,
            thread_id: threadId,
          },
        },
      });
      isLiked = false;
    } else {
      await prisma.likes.create({
        data: {
          user_id: user,
          thread_id: threadId,
          created_by: user,
        },
      });
      isLiked = true;
    }

    const likeCount = await prisma.likes.count({
      where: {
        thread_id: threadId,
      },
    });

    broadcastEvent("like", {
      id: threadId,
      count: likeCount,
    });

    res.status(200).json({
      status: "success",
      message: isLiked ? "Thread liked" : "Thread unliked",
      isLiked,
      likeCount,
    });
  },
);
