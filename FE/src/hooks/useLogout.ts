import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { getMe } from "@/services/auth.api";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await getMe();
      } catch {
        logout();
        navigate("/login");
      }
    }, 180_000);

    return () => clearInterval(interval);
  }, [logout, navigate]);
};
