import { MessageSquareText, MoveLeft } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import { useNavigate, useParams } from "react-router-dom";
import LikeButton from "./LikeButton";
import { useThread } from "@/hooks/useThread";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { likeThread } from "@/services/thread.api";
import { setLike, setLikesCount } from "@/store/like/like.slice";
import { useEffect } from "react";
import Images from "../costum/Images";
import Replies from "../replies/Replies";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAuth } from "@/hooks/useAuth";
import type { Thread } from "@/types/thread";

export default function ThreadDetail() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { thread, fetchThread, loading } = useThread();

  const dispatch = useDispatch<AppDispatch>();

  const likes = useSelector((state: RootState) => state.likes.likes);
  const likeCount = useSelector((state: RootState) => state.likes.likeCount);

  const navigate = useNavigate();

  const { send } = useWebSocket({
    like: (payload: { id: number; count: number }) => {
      dispatch(setLikesCount({ id: payload.id, count: payload.count }));
    },
  });

  useEffect(() => {
    if (id) fetchThread(Number(id));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchThread(Number(id)).then((action) => {
        const thread = action.payload as Thread; // cast ke Thread

        const currentUserId = user?.id;

        const isLiked =
          thread.likes?.some((like) => like.user_id === currentUserId) ?? false;

        const count = thread.likes?.length ?? 0;

        dispatch(setLike({ id: thread.id, isLiked }));
        dispatch(setLikesCount({ id: thread.id, count }));
      });
    }
  }, [id, user, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!thread) {
    return <p className="p-5">Thread not found</p>;
  }

  const isLiked = likes[thread.id] ?? false;
  const count = likeCount[thread.id] ?? 0;

  const toggleLike = async () => {
    try {
      const res = await likeThread(thread.id);

      dispatch(setLike({ id: thread.id, isLiked: res.data.isLiked }));
      dispatch(setLikesCount({ id: thread.id, count: res.data.likeCount }));

      if (send) {
        send("like", {
          id: thread.id,
          count: res.data.likeCount,
        });
      }
    } catch (err) {
      console.error("Failed to like thread:", err);
    }
  };

  return (
    <div>
      <Card className="p-5 rounded-none border-0 border-b-2 bg-transparent">
        <h2 className="font-semibold text-3xl flex items-center space-x-1">
          <button
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
          >
            <MoveLeft />
          </button>
          <span>Status</span>
        </h2>
        <div className="grid grid-cols-[60px_1fr]">
          <section>
            <img
              src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
              alt="Avatar"
              className="w-full rounded-full"
            />
          </section>
          <CardContent className="space-y-1">
            <CardHeader className="flex w-full justify-start p-0">
              <h3>{thread.created.full_name}</h3>
              <h4 className="text-gray-500">@{thread.created.username}</h4>
            </CardHeader>
            <CardDescription className="space-y-3">
              <span>{thread.content}</span>
              {thread.images && <Images images={thread.images} />}
            </CardDescription>
            <CardAction className="flex justify-between w-2/9">
              <span className="flex items-center space-x-1">
                <LikeButton isLiked={isLiked} onToggle={toggleLike} />
                <span>{count}</span>
              </span>
              <span className="flex items-center space-x-2">
                <MessageSquareText className="text-gray-500" />
                <span>{thread.replies?.length ?? 0}</span>
              </span>
            </CardAction>
          </CardContent>
        </div>
      </Card>
      <Replies threadId={thread.id} />
    </div>
  );
}
