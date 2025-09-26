import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccessDenied from "../components/AccessDenied";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // optional spinner
  }

  if (!user) {
    // not logged in → go to login
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // logged in but wrong role
    return <AccessDenied roleName={requiredRole} />;
  }

  // allowed → render the actual page
  return children;
}
