import Follow from "@/components/costum/Follow";
import Mark from "@/components/costum/Mark";
import Profile from "@/components/user/Profile";
import Sidebar from "@/components/costum/Sidebar";
import ThreadDetail from "@/components/thread/ThreadDetail";
import ThreadDialog from "@/components/thread/ThreadDialog";
import Threads from "@/components/thread/Threads";
import { useThread } from "@/hooks/useThread";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [notif, setNotif] = useState(false);
  const { createThread } = useThread();

  const handleImageSelect = (files: File[]) => {
    setImage((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewThread = async (content: string) => {
    const images = image;

    const res = await createThread({ content, images });

    if (res) {
      setNotif(true);

      setTimeout(() => {
        setNotif(false);
      }, 3000);
    }

    setOpen(false);
    setImage([]);
    setContent("");
  };

  return (
    <>
      {notif && (
        <div className="absolute bottom-5 right-5 z-10 bg-green-500 opacity-95 text-black font-semibold px-4 py-2 rounded shadow-lg">
          New thread added !
        </div>
      )}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-[350px_minmax(600px,890px)_500px] gap-6 w-screen">
          <nav className="sticky top-0 h-screen">
            <Sidebar onCreatePost={() => setOpen(true)} />
          </nav>
          <main className="flex flex-col border-x-2">
            <Routes>
              <Route
                path="/"
                element={
                  <Threads
                    content={content}
                    onCreatePost={() => setOpen(true)}
                    onImageSelect={setImage}
                  />
                }
              />
              <Route path="/thread/:id" element={<ThreadDetail />} />
            </Routes>
          </main>
          <aside className="sticky top-0 h-screen p-5 space-y-5">
            <Profile />
            <Follow />
            <Mark />
          </aside>
        </div>
      </div>
      <ThreadDialog
        open={open}
        onOpenChange={setOpen}
        image={image}
        onRemoveImage={handleRemoveImage}
        onImageSelect={handleImageSelect}
        clearImage={() => setImage([])}
        content={content}
        setContent={setContent}
        newThread={handleNewThread}
      />
    </>
  );
}
