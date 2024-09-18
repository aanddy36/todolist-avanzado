import { render, screen } from "@testing-library/react";
import { useTasks } from "../context/TasksContext";
import AllTasks from "./AllTasks";

jest.mock("../context/TasksContext");
jest.mock("../ui/SingleTask", () => () => <div>Mocked SingleTask</div>);
jest.mock("../ui/SingleTaskAdmin", () => () => <div>Mocked SingleTaskAdmin</div>);

describe("AllTasks Component", () => {
  test("renders loading state", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      isLoadingTask: true,
    });

    render(<AllTasks.User />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("renders 'No hay notas todavía.' when there are no tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      isLoadingTask: false,
    });

    render(<AllTasks.User />);

    expect(screen.getByText("No hay notas todavía.")).toBeInTheDocument();
  });

  test("renders SingleTask components when there are tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: true },
      ],
      isLoadingTask: false,
    });

    render(<AllTasks.User />);

    expect(screen.getAllByText("Mocked SingleTask")).toHaveLength(2);
  });

  test("renders SingleTaskAdmin components for admin when there are tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: true },
      ],
      isLoadingTask: false,
    });

    render(<AllTasks.Admin />);

    expect(screen.getAllByText("Mocked SingleTaskAdmin")).toHaveLength(2);
  });
});