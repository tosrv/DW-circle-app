import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middleawares/async";
import { requireThread, requireUser } from "../thread/thread.controller";
import { addReply, findReplies } from "./replies.repository";
import { broadcastReply } from "../../sockets/websocket";
import { toImageUrl } from "../../utils/imageUrl";

// New reply
export const createReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const username = (req as any).user.username;
    const threadId = Number(req.params.id);
    const content = req.body.content;
    const images = req.files as Express.Multer.File[];
    const image: string[] = images?.map((img) => img.filename) || [];

    const user = await requireUser(username);
    await requireThread(threadId);

    const reply = await addReply(threadId, user.id, content, image);
    const data = {
      ...reply,
      images: toImageUrl(reply.images),
    };

    broadcastReply(data);

    res.status(201).json({
      status: "success",
      message: "Reply created",
      data,
    });
  },
);

// Display replies
export const getReplies = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const replies = await findReplies(Number(req.params.id));
    
    const data = replies.map((reply) => ({
      ...reply,
      images: toImageUrl(reply.images),
    }));

    res.status(200).json({
      status: "success",
      message: "Replies found",
      data,
    });
  },
);
