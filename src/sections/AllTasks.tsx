import React from "react";
import SingleTask from "../ui/SingleTask";
import SingleTaskAdmin from "../ui/SingleTaskAdmin";
import { useTasks } from "../context/TasksContext";

interface AllTasksProps {
  children: React.ReactNode;
}

const AllTasksBase: React.FC<AllTasksProps> = ({ children }) => {
  const { tasks, isLoadingTask } = useTasks();

  if (isLoadingTask) {
    return <p className="py-4 w-full text-center">Cargando...</p>;
  }

  return (
    <div>
      {tasks.length ? (
        <ul className="space-y-4 mt-4">{children}</ul>
      ) : (
        <p className="text-sm italic w-full text-center opacity-70 py-7">
          No hay notas todavía.
        </p>
      )}
    </div>
  );
};

const AllTasksUser: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <AllTasksBase>
      {tasks.map((task) => (
        <SingleTask {...task} key={task.id} />
      ))}
    </AllTasksBase>
  );
};

const AllTasksAdmin = () => {
  const { tasks, setCompletedFilter } = useTasks();

  return (
    <AllTasksBase>
      {tasks.map((task) => (
        <SingleTaskAdmin key={task.id} {...task} />
      ))}
    </AllTasksBase>
  );
};

const AllTasks = {
  User: AllTasksUser,
  Admin: AllTasksAdmin,
};

export default AllTasks;
