import { ImagePlus } from "lucide-react";
import { Button } from "../ui/button";
import ThreadsLists from "./ThreadsLists";
import { Card, CardContent } from "../ui/card";
import { useRef, useEffect } from "react";
import { useThread } from "@/hooks/useThread";

type ThreadsProps = {
  content?: string
  onCreatePost: () => void
  onImageSelect: (files: File[]) => void
}


export default function Threads({
  content,
  onCreatePost,
  onImageSelect
}: ThreadsProps) {
  const { threads, fetchThreads, loading } = useThread();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchThreads();
  }, []);

  if (loading) return <div>Loading...</div>;

  const openDialog = () => onCreatePost();

  const onPickImage = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    onImageSelect(Array.from(e.target.files));
    e.currentTarget.value = "";
    onCreatePost();
  };

  return (
    <div>
      <Card className="p-5 rounded-none border-0 border-b-2 bg-transparent">
        <h2 className="font-semibold text-3xl">Home</h2>
        <div className="grid grid-cols-[60px_1fr]">
          <section>
            <img
              src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
              alt="Avatar"
              className="w-full rounded-full"
            />
          </section>
          <CardContent className="flex w-full justify-between items-center">
            <span onClick={openDialog} className="text-2xl text-gray-500 w-8/10">
              {content || "What is happening?!"}
            </span>

            <div className="flex items-center space-x-3">
              <span
                onClick={onPickImage}
                className="text-green-600 hover:cursor-pointer"
              >
                <ImagePlus />
              </span>

              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />

              <Button
                onClick={openDialog}
                className="bg-green-500 text-lg rounded-2xl text-white hover:text-black"
              >
                Post
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
      <ThreadsLists threads={threads} />
    </div>
  );
}
