import React, { FC } from "react";
import CheckedIcon from "../icons/CheckedIcon";
import TrashIcon from "../icons/ThrashIcon";
import { useAuth } from "../context/AuthContext";
import { Completed, Task } from "../types";
import { useTasks } from "../context/TasksContext";

const SingleNoteAdmin: FC<Task> = ({
  completed,
  id,
  name,
  user: { email },
}) => {
  const { isLoading, user } = useAuth();
  const { isLoadingTask, deleteTask, setCurrentPage, setCompletedFilter } = useTasks();

  const handleDelete = () => {
    if (user?.role) {
      deleteTask(id, user.role);
      setCurrentPage(1);
      setCompletedFilter(Completed.ALL);
    }
  };

  return (
    <li className="flex items-center space-x-4">
      <span className="flex items-center justify-center w-6 h-6 border border-border rounded">
        {completed ? <CheckedIcon /> : <span className="w-5 h-5"></span>}
      </span>
      <span className="grow">{name}</span>
      <span className=" italic font-medium flex flex-col gap-1 items-start text-sm opacity-70">
        De: {email}
      </span>
      <button
        onClick={handleDelete}
        className="p-2 rounded-md disabled:cursor-not-allowed"
        disabled={isLoading || isLoadingTask}
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default SingleNoteAdmin;

