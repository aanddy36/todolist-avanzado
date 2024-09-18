import { createContext, useContext, useEffect, useState } from "react";
import { AuthOptions, Task, Completed } from "../types";
import { useAuth } from "./AuthContext";
import { getTasksByUserId } from "../api/tasks/getTasksByUserId";
import { createTask } from "../api/tasks/createTask";
import { deleteATask } from "../api/tasks/deleteATask";
import { editATask } from "../api/tasks/editATask";
import { getAllTheTasks } from "../api/tasks/getAllTheTasks";
import { socket } from "../socket";

interface TasksContextProps {
  closeModal: () => void;
  isModalOpen: boolean;
  openModal: (taskId: number) => void;
  selectedTask: Task | null;
  tasks: Task[];
  isLoadingTask: boolean;
  postTask: (body: { name: string }) => Promise<void>;
  deleteTask: (taskId: number, role: AuthOptions) => Promise<void>;
  updateTask: (
    taskId: number,
    updates: {
      name?: string;
      completed?: boolean;
    }
  ) => Promise<void>;
  getTasks: (page?: number, completed?: boolean) => Promise<void>;
  totalTasks: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  completedFilter: Completed;
  setCompletedFilter: React.Dispatch<React.SetStateAction<Completed>>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

interface TasksProps {
  children: React.ReactNode;
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const TasksProvider: React.FC<TasksProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const [isLoadingTask, setIsLoadingTask] = useState(false);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedFilter, setCompletedFilter] = useState<Completed>(
    Completed.ALL
  );

  //USER & ADMIN
  const getTasks = async (page: number = 1, completed?: boolean) => {
    setIsLoadingTask(true);
    try {
      await delay(1000);
      let data;
      if (user?.role && user.role === AuthOptions.USER) {
        data = await getTasksByUserId(user?.id);
      } else {
        data = await getAllTheTasks(page, completed);
        setTotalTasks(data.totalTasks);
      }
      setTasks(data.tasks as Task[]);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  const refreshTasks = async () => {
    await delay(1000);
    let completed: boolean | undefined;

    switch (completedFilter) {
      case Completed.YES:
        completed = true;
        break;
      case Completed.NO:
        completed = false;
        break;
      default:
        completed = undefined;
        break;
    }
    await getTasks(currentPage, completed);
  };

  //USER
  const postTask = async (body: { name: string }) => {
    setIsLoadingTask(true);
    try {
      /* await delay(1000); */
      await createTask(user?.id, body);
      await refreshTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  //USER & ADMIN
  const deleteTask = async (taskId: number, role: AuthOptions) => {
    setIsLoadingTask(true);
    try {
      /* await delay(1000); */
      await deleteATask(taskId);
      await refreshTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  //USER
  const updateTask = async (
    taskId: number,
    updates: { name?: string; completed?: boolean }
  ) => {
    setIsLoadingTask(true);
    try {
      /* await delay(1000); */
      await editATask(taskId, updates);
      await refreshTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  useEffect(() => {
    if (user?.id && user.role === AuthOptions.USER) {
      getTasks();
    }
  }, [user?.id, user?.role]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openModal = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  //Reaccionar a los eventos del websocket
  useEffect(() => {
    socket.on("taskUpdated", async () => await refreshTasks());
    socket.on("taskDeleted", async () => await refreshTasks());
    socket.on("taskCreated", async () => await refreshTasks());

    return () => {
      socket.off("taskUpdated");
      socket.off("taskDeleted");
      socket.off("taskCreated");
    };
  }, [currentPage, completedFilter]);

  return (
    <TasksContext.Provider
      value={{
        closeModal,
        openModal,
        isModalOpen,
        selectedTask,
        tasks,
        isLoadingTask,
        postTask,
        deleteTask,
        updateTask,
        totalTasks,
        getTasks,
        currentPage,
        setCurrentPage,
        completedFilter,
        setCompletedFilter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks debe ser usado dentro de un TasksProvider");
  }
  return context;
};

export { TasksProvider, useTasks };
