import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middleawares/async";
import { AppError } from "../../utils/error";
import { toImageUrl } from "../../utils/imageUrl";
import { findUser } from "../auth/auth.repository";
import {
  addThread,
    editThread,
    findThread,
    findThreads,
    removeThread,
} from "./thread.repository";
import { broadcastEvent } from "../../sockets/websocket";

export async function requireUser(username: string) {
  const user = await findUser(username);
  if (!user) throw new AppError(404, "User not found");

  return user;
}

export async function requireThread(threadId: number) {
  const thread = await findThread(threadId);
  if (!thread) throw new AppError(404, "Thread not found");

  return thread;
}

async function author(username: string, threadId: number) {
  const user = await requireUser(username);
  const thread = await requireThread(threadId);

  if (thread.created_by !== user.id) throw new AppError(401, "Unauthorized");
  return;
}

// Display all threads
export const getThreads = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const threads = await findThreads();
    if (!threads) throw new AppError(404, "Threads not found");

    const data = threads.map((thread) => ({
      ...thread,
      images: toImageUrl(thread.images),
    }));

    res.status(200).json({
      status: "success",
      data,
    });
  },
);

// Display by id
export const getThread = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const thread = await requireThread(Number(req.params.id));

    const data = {
      ...thread,
      images: toImageUrl(thread.images),
    };

    res.status(200).json({
      status: "success",
      data,
    });
  },
);


// Create new thread
export const createThread = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await requireUser((req as any).user.username);
    const content = req.body.content;
    const images = req.files as Express.Multer.File[];
    const image: string[] = images?.map((img) => img.filename) || [];

    const newThread = await addThread(user.id, content, image);
    const data = {
      ...newThread,
      images: toImageUrl(newThread.images),
    };

    broadcastEvent("new_thread", data);

    res.status(201).json({
      status: "success",
      message: "Thread created",
      data,
    });
  },
);



// Delete thread
export const deleteThread = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const username = (req as any).user.username;
    const threadId = Number(req.params.id);

    await author(username, threadId);
    await removeThread(threadId);

    res.status(200).json({
      status: "success",
      message: "Thread deleted",
    });
  },
);

// Update thread
export const updateThread = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const username = (req as any).user.username;
    const threadId = Number(req.params.id);
    const content = req.body.content;
    const images = req.files as Express.Multer.File[];
    const image: string[] = images?.map((img) => img.filename) || [];

    await author(username, threadId);
    const updated = await editThread(threadId, content, image);

    const data = {
      ...updated,
      images: toImageUrl(updated.images),
    };

    res.status(200).json({
      status: "success",
      message: "Thread updated",
      data,
    });
  },
);
