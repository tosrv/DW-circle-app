import type { Thread } from "./thread";

export interface ThreadsProps {
  threads: Thread[];
}

export interface ThreadDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  image: File[];
  onImageSelect: (file: File[]) => void;
  onRemoveImage: (index: number) => void;
  clearImage: () => void;

  content?: string;
  setContent?: (value: string) => void;

  newThread: (content: string) => void;
}

export interface LikeButtonProps {
  isLiked: boolean;
  onToggle: () => void;
}
