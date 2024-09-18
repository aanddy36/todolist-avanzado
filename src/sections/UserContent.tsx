import React from "react";
import { useAuth } from "../context/AuthContext";
import ExitIcon from "../icons/ExitIcon";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import EditModal from "./EditModal";
import SingleTask from "../ui/SingleTask";
import { Task } from "../types";
import { useTasks } from "../context/TasksContext";

interface NewTask {
  name: string;
}

const UserContent = () => {
  const { isModalOpen, selectedTask, tasks, isLoadingTask, postTask } = useTasks();
  const { logout, isLoading, fetchError, user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<NewTask>();

  const onSubmit = (data: NewTask) => {
    postTask(data)
    reset()
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light p-8">
      <div
        className={`w-full max-w-md bg-background-white p-6 border border-border rounded-lg shadow-md
         transition-all duration-200
        ${isLoading ? " opacity-60" : "opacity-100"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-text-dark">ToDo List</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-dark">
              {user && user.email} (USER)
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

        {fetchError && (
          <div className=" rounded-md bg-red-500 text-white p-3">
            {fetchError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 mt-4">
          <Input
            id={"name"}
            label={"Nueva nota"}
            type={"text"}
            register={register}
            disabled={isLoading || isLoadingTask}
            validation={{
              required: "Debe escribir algo",
            }}
            error={errors.name}
          />
          <button
            disabled={isLoading || isLoadingTask}
            className="mt-2 w-full bg-primary text-background-light py-2 rounded-md hover:bg-primary-light
             disabled:cursor-not-allowed"
          >
            Agregar
          </button>
        </form>

        {isLoadingTask ? (
          <p className=" py-4 w-full text-center">
            Cargando...
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <SingleTask {...task} key={task.id} />
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && selectedTask && <EditModal />}
    </div>
  );
};

export default UserContent;
