import React from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import Input from "../ui/Input";

interface NewTask {
  name: string;
}

const CreateTaskForm = () => {
  const { isLoading, fetchError } = useAuth();
  const { isLoadingTask, postTask } = useTasks();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NewTask>();

  const onSubmit = (data: NewTask) => {
    postTask(data);
    reset();
  };
  return (
    <>
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
    </>
  );
};

export default CreateTaskForm;
