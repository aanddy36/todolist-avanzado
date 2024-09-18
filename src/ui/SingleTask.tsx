import React, { FC } from "react";

import CheckedIcon from "../icons/CheckedIcon";
import TrashIcon from "../icons/ThrashIcon";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { AuthOptions, Task } from "../types";

const SingleTask: FC<Task> = ({ completed, id, name }) => {
  const { openModal, deleteTask, isLoadingTask } = useTasks();
  const { isLoading, user } = useAuth();

  return (
    <li className="flex items-center space-x-4">
      <span className="flex items-center justify-center w-6 h-6 border border-border rounded">
        {completed ? <CheckedIcon /> : <span className="w-5 h-5"></span>}
      </span>
      <span className="grow">{name}</span>
      <button
        onClick={() => openModal(id)}
        disabled={isLoading || isLoadingTask}
        className="bg-green-500 text-background-light py-1 px-3 rounded-md hover:bg-green-600 
        disabled:cursor-not-allowed"
      >
        Editar
      </button>
      <button
        onClick={() => deleteTask(id, user?.role as AuthOptions)}
        disabled={isLoading || isLoadingTask}
        className="p-2 rounded-md disabled:cursor-not-allowed"
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default SingleTask;
