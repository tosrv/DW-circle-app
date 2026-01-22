import { MessageSquareText } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import type { ThreadsProps } from "@/types/props";
import { useEffect } from "react";
import LikeButton from "./LikeButton";
import { likeThread } from "@/services/thread.api";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setLike, setLikesCount } from "@/store/like/like.slice";
import { addThreadToState } from "@/store/thread/thread.slice";
import { useWebSocket } from "@/hooks/useWebSocket";
import Images from "../costum/Images";

export default function ThreadsLists({ threads }: ThreadsProps) {
  const { user } = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  const likes = useSelector((state: RootState) => state.likes.likes);
  const likesCount = useSelector((state: RootState) => state.likes.likeCount);

  const { send } = useWebSocket({
    new_thread: (payload) => dispatch(addThreadToState(payload)),
    like: (payload: { id: number; count: number }) => {
      dispatch(setLikesCount({ id: payload.id, count: payload.count }));
    },
  });

  const toggleLike = async (id: number) => {
    try {
      const res = await likeThread(id);

      dispatch(setLike({ id, isLiked: res.data.isLiked }));
      dispatch(setLikesCount({ id, count: res.data.likeCount }));

      if (send) {
        send("like", {
          id,
          count: res.data.likeCount,
        });
      }
    } catch (err) {
      console.error("Failed to like thread:", err);
    }
  };

  useEffect(() => {
    if (!user) return;

    threads.forEach((thread) => {
      const currentUserId = user!.id;

      const isLiked =
        thread.likes?.some((like) => like.user_id === currentUserId) ?? false;

      const count = thread.likes?.length ?? 0;

      dispatch(setLike({ id: thread.id, isLiked }));
      dispatch(setLikesCount({ id: thread.id, count }));
    });
  }, [threads, user, dispatch]);

  return (
    <ul>
      {threads.map((thread) => {
        const isLiked = likes[thread.id] ?? false;
        const count = likesCount[thread.id] ?? 0;

        return (
          <li key={thread.id}>
            <Card className="p-5 rounded-none border-0 border-b-2 bg-transparent">
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
                    <h4 className="text-gray-500">
                      @{thread.created.username}
                    </h4>
                  </CardHeader>
                  <CardDescription>
                    <Link to={`/thread/${thread.id}`}>{thread.content}</Link>
                    {thread.images!.length > 0 && (
                      <Images images={thread.images || []} />
                    )}
                  </CardDescription>
                  <CardAction className="flex justify-between w-2/9">
                    <span className="flex items-center space-x-1">
                      <LikeButton
                        isLiked={isLiked}
                        onToggle={() => toggleLike(thread.id)}
                      />
                      <span>{count}</span>
                    </span>
                    <Link to={`/thread/${thread.id}`} className="flex items-center space-x-2">
                      <MessageSquareText className="text-gray-500" />
                      <span>{thread.replies?.length ?? 0}</span>
                    </Link>
                  </CardAction>
                </CardContent>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
