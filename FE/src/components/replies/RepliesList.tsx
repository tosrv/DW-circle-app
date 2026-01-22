import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import type { RepliesProps } from "./Replies";
import { getReplies } from "@/services/replies.api";
import { useWebSocket } from "@/hooks/useWebSocket";
import Images from "../costum/Images";
import LikeButton from "../thread/LikeButton";
import { Heart, MessageSquareText } from "lucide-react";

interface Replies {
  id: number;
  content: string;
  images?: string[];
  created: {
    username: string;
    full_name: string;
    photo_profile: string;
  };
}

export default function RepliesList({ threadId }: RepliesProps) {
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<Replies[]>([]);
  const [click, setClick] = useState(false);
  const { send } = useWebSocket({
    new_reply: (payload) => {
      setReplies((prev) => [payload, ...prev]);
    },
  });

  useEffect(() => {
    if (!threadId) return;
    send("new_reply", {
      id: threadId,
    });
  }, [threadId, send]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        const res = await getReplies(threadId);

        setReplies(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }, [threadId]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {replies.length === 0 ? (
        <div className="flex justify-center items-center h-30">
          <h2 className="text-2xl text-gray-500">No replies yet</h2>
        </div>
      ) : (
        replies.map((reply) => {
          return (
            <li key={reply.id}>
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
                      <h3>{reply.created.full_name}</h3>
                      <h4 className="text-gray-500">
                        @{reply.created.username}
                      </h4>
                    </CardHeader>
                    <CardDescription>
                      <p>{reply.content}</p>
                      {reply.images && <Images images={reply.images} />}
                    </CardDescription>
                    <CardAction className="flex space-x-5">
                      <span onClick={() => setClick(!click)}>
                        <Heart
                          className={`transition ${click ? "fill-red-600 text-red-600" : "text-gray-500"}`}
                        />
                      </span>
                      <span>
                        <MessageSquareText className="text-gray-500" />
                      </span>
                    </CardAction>
                  </CardContent>
                </div>
              </Card>
            </li>
          );
        })
      )}
    </ul>
  );
}
