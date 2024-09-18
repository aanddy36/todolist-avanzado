import React from "react";
import { useAuth } from "../context/AuthContext";
import ExitIcon from "../icons/ExitIcon";
import { useTasks } from "../context/TasksContext";

interface Props {
  isAdmin?: boolean;
}

const Header: React.FC<Props> = ({ isAdmin = false }) => {
  const { logout, isLoading, user } = useAuth();
  const { isLoadingTask } = useTasks();
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-text-dark">ToDo List</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-text-dark">
          {user && user.email} ({!isAdmin ? "USER" : "ADMIN"})
        </span>
        <button
          onClick={logout}
          disabled={isLoading || isLoadingTask}
          className="p-2 rounded hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          {<ExitIcon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
