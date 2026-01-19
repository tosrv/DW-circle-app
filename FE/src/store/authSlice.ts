import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "@/services/api";
import type { User } from "@/types/user";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await api.get("/me", { withCredentials: true });

  return res.data.user as User;
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    await api.post("/login", { email, password }, { withCredentials: true });
    const res = await api.get("/me", { withCredentials: true });
    return res.data.user as User;
  } catch (err: any) {
    const message =
      err.response.data.error || err.response.data.message || "Login failed";
    return rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/logout", {}, { withCredentials: true });
});

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;

        console.error("Login failed: ", action.payload);
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
