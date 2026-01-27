import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { user, loading, fetchUser } = useAuth();
  const location = useLocation();
  
  useLogout();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return null;
  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: "You must be logged in to access page",
        }}
      />
    );

  return <Outlet />;
}
