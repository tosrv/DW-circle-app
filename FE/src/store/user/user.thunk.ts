import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchUser, updateUser } from "@/services/user.api";
import type { UserRequest } from "@/types/user";
import type { User } from "@/types/user";

export const editUser = createAsyncThunk<User, UserRequest>(
  "auth/updateUser",
  async (userRequest: UserRequest) => {
    const res = await updateUser(userRequest);
    return res.data.data as User;
  },
);

export const fetchSearchUsers = createAsyncThunk("follows/search", async (q: string) => {
  const res = await searchUser(q);
  return {q, users: res.data.data};
});
