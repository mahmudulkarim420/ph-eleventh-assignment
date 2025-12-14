import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider"; // path adjust করো

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optional: loading spinner
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
