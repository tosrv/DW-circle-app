import { useAuth } from "@/hooks/useAuth";
import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading, fetchUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace 
  state={{ from: location, message: "You must be logged in to access page" }}/>;

  return <>{children}</>;
}
