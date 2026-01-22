import { ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import type { ThreadDialogProps } from "@/types/props";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function ThreadDialog({
  open,
  onOpenChange,
  image,
  onImageSelect,
  onRemoveImage,
  clearImage,
  content,
  setContent,
  newThread,
}: ThreadDialogProps) {
  const [msg, setMsg] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onImageSelect(Array.from(e.target.files));
    e.currentTarget.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    newThread(content);
    setContent?.("");
    clearImage?.();
  };

  useEffect(() => {
    setMsg((prev) => image.map((_, i) => prev[i] || ""));
  }, [image]);

  useEffect(() => {
    image.forEach((_, index) => {
      if (msg[index]) return;

      const showTimer = setTimeout(() => {
        setMsg((prev) =>
          prev.map((m, i) => (i === index ? "Image uploaded!" : m)),
        );

        const hideTimer = setTimeout(() => {
          setMsg((prev) => prev.map((m, i) => (i === index ? "" : m)));
        }, 3000);

        return () => clearTimeout(hideTimer);
      }, 5000);

      return () => clearTimeout(showTimer);
    });
  }, [image]);

  useEffect(() => {
    if (!image.length) {
      setImageUrl([]);
      return;
    }

    const urls = image.map((file) => URL.createObjectURL(file));
    setImageUrl(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [image]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <input
          type="file"
          onChange={onFileChange}
          ref={fileRef}
          accept="image/*"
          hidden
          multiple
        />
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="grid grid-cols-[70px_1fr] mb-5 space-x-3">
              <DialogTitle>
                <img
                  src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                  alt="Avatar"
                  className="w-full rounded-full"
                />
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex flex-col">
                  <textarea
                    value={content}
                    onChange={(e) => setContent?.(e.target.value)}
                    placeholder="What is happening?!"
                    required
                    className="w-full resize-none border-none focus:outline-none h-fit overflow-scroll text-lg p-2"
                  />

                  {image.length > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mt-3 max-h-96 overflow-scroll">
                        {imageUrl.map((url, i) => (
                          <div key={i} className="relative group">
                            <img src={url} className="rounded-lg" />

                            <button
                              type="button"
                              onClick={() => onRemoveImage(i)}
                              className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-1
        opacity-0 group-hover:opacity-100 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      <div>
                        {msg.find((m) => m) && (
                          <span className="absolute text-sm text-green-500">
                            {msg.find((m) => m)}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </DialogDescription>
            </div>
            <hr />
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-between items-center w-full mt-3 px-5">
              <span
                onClick={() => {
                  if (image.length < 4) {
                    fileRef.current?.click();
                  }
                }}
                className={
                  image.length < 4
                    ? "text-green-600 hover:cursor-pointer"
                    : "text-green-800"
                }
              >
                <ImagePlus />
              </span>
              <Button
                type="submit"
                className="bg-green-700 text-lg rounded-2xl text-gray-300 hover:text-black"
                disabled={!content}
              >
                Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
