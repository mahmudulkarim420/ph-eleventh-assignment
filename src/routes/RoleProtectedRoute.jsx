import { Navigate, Outlet } from "react-router";
import useRoleCheck from "../hooks/useRoleCheck";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { role, roleLoading } = useRoleCheck();

  if (roleLoading) return <p>Loading...</p>;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;