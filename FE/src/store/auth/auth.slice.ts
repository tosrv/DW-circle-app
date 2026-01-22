import { createSlice } from "@reduxjs/toolkit";
import { authExtraReducers } from "./auth.reducer";
import type { AuthState } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: authExtraReducers,
});

export default authSlice.reducer;
