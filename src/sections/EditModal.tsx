import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";

interface TaskProps {
  name: string;
  completed: boolean;
}

const EditModal = () => {
  const { selectedTask, updateTask, closeModal, isModalOpen } = useTasks();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TaskProps>({});

  useEffect(() => {
    if (selectedTask) {
      reset({
        name: selectedTask.name,
        completed: selectedTask.completed,
      });
    }
  }, [selectedTask]);

  const handleModalSubmit = (data: TaskProps) => {
    if (selectedTask?.id) {
      updateTask(selectedTask.id, data);
      closeModal();
    }
  };

  if (!isModalOpen || !selectedTask) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-dark">Editar Nota</h2>
          <button
            onClick={closeModal}
            className="text-text-dark hover:text-primary"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(handleModalSubmit)}>
          <Input
            id={"name"}
            label={"Nota"}
            type={"text"}
            register={register}
            validation={{
              required: "Debe escribir algo",
            }}
            error={errors.name}
          />
          <div className="flex items-center mt-4">
            <input
              id="completed"
              type="checkbox"
              {...register("completed")}
              disabled={false}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded disabled:cursor-not-allowed"
            />
            <label
              htmlFor="completed"
              className="ml-2 block text-sm text-text-dark"
            >
              Completada
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background-light py-2 rounded-md hover:bg-primary-light mt-4"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
