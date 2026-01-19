import type { AppDispatch, RootState } from "@/store";
import { fetchUser, loginUser, logoutUser } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  return {
    user,
    loading,
    fetchUser: () => dispatch(fetchUser()),
    login: (email: string, password: string) =>
      dispatch(loginUser({ email, password })),
    logout: () => dispatch(logoutUser()),
  };
};
