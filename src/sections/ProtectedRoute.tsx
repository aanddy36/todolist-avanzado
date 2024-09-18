import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { AuthOptions } from "../types";
import AdminPage from "../pages/AdminPage";

import { TasksProvider } from "../context/TasksContext";
import UserPage from "../pages/UserPage";


const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }


  return <TasksProvider>
    {user.role === AuthOptions.ADMIN ? <AdminPage /> : <UserPage />}
  </TasksProvider>;
};

export default React.memo(ProtectedRoute);
