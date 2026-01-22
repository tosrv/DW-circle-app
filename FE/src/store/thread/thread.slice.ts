import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { threadExtraReducers } from "./thread.reducer";
import type { Thread, ThreadState } from "@/types/thread";

const initialState: ThreadState = {
  threads: [],
  thread: null,
  loading: false,
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    addThreadToState(state, action: PayloadAction<Thread>) {
      state.threads.unshift(action.payload);
    },
  },
  extraReducers: threadExtraReducers,
});

export const { addThreadToState } = threadSlice.actions;
export default threadSlice.reducer;
