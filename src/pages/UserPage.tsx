import React from "react";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import EditModal from "../sections/EditModal";
import AllTasks from "../sections/AllTasks";
import Header from "../sections/Header";
import CreateTaskForm from "../sections/CreateTaskForm";

const UserPage = () => {
  const { isLoading } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light p-8">
      <div
        className={`w-full max-w-md bg-background-white p-6 border border-border rounded-lg shadow-md
         transition-all duration-200
        ${isLoading ? " opacity-60" : "opacity-100"}`}
      >
        <Header />
        <CreateTaskForm />
        <AllTasks.User />
      </div>
      <EditModal />
    </div>
  );
};

export default React.memo(UserPage);
