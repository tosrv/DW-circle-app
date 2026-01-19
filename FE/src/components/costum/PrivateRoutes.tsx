import { useAuth } from "@/hooks/useAuth";
import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
