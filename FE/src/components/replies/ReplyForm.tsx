import { ImagePlus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

interface ReplyFormProps {
  onSubmit: (content: string, images: File[]) => void;
  loading: boolean;
}
export default function ReplyForm({ onSubmit, loading }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPickImage = () => {
    fileRef.current?.click();
  };

  const handleImageSelect = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleImageSelect(Array.from(e.target.files));
    e.currentTarget.value = "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content, images);
    setImages([]);
    setContent("");
  };

  return (
    <div className="">
      <Card className="p-5 rounded-none border-0 border-b-2 bg-transparent">
        <div className="grid grid-cols-[60px_1fr]">
          <section>
            <img
              src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
              alt="Avatar"
              className="w-full rounded-full"
            />
          </section>
          <CardContent>
            <form
              className="flex w-full h-full justify-between items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your reply!"
                className="text-lg border-none focus:outline-none bg-transparent w-8/10 "
              />

              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="Image"
                      className="w-20 h-20 object-cover"
                    />
                  ))}
                </div>
              )}

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
                  type="submit"
                  disabled={!content || loading}
                  className="bg-green-500 text-lg rounded-2xl text-white hover:text-black"
                >
                  {loading ? "Sending..." : "Reply"}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
