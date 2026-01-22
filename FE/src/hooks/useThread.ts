import type { AppDispatch, RootState } from "@/store/store";
import {
  createThread,
  fetchThread,
  fetchThreads,
} from "@/store/thread/thread.thunk";
import type { ThreadRequest } from "@/types/thread";
import { useDispatch, useSelector } from "react-redux";

export const useThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { threads, thread, loading } = useSelector(
    (state: RootState) => state.thread,
  );

  return {
    threads,
    thread,
    loading,

    fetchThreads: () => dispatch(fetchThreads()),
    fetchThread: (id: number) => dispatch(fetchThread(id)),
    createThread: (data: ThreadRequest) => dispatch(createThread(data)),
  };
};
