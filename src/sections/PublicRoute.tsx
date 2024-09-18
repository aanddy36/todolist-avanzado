import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={`/${user.id}`} />;
};

export default React.memo(PublicRoute);
