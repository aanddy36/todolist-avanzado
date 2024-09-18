import React from "react";
import { useAuth } from "../context/AuthContext";
import Filters from "../sections/Filters";
import AllTasks from "../sections/AllTasks";
import Header from "../sections/Header";

const AdminPage = () => {
  const { isLoading } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light p-8">
      <div
        className={`w-full max-w-md bg-background-white p-6 border border-border rounded-lg shadow-md
          transition-all duration-200
        ${isLoading ? " opacity-60" : "opacity-100"}`}
      >
        <Header isAdmin />
        <Filters />
        <AllTasks.Admin />
      </div>
    </div>
  );
};

export default React.memo(AdminPage);
