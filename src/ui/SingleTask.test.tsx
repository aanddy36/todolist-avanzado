import { render, screen, fireEvent } from "@testing-library/react";
import SingleTask from "./SingleTask";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";


jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../context/TasksContext", () => ({
  useTasks: jest.fn(),
}));

describe("SingleTask Component", () => {
  const mockOpenModal = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: "admin" },
      isLoading: false,
    });

    (useTasks as jest.Mock).mockReturnValue({
      openModal: mockOpenModal,
      deleteTask: mockDeleteTask,
      isLoadingTask: false,
    });
  });

  it("should render the task details correctly", () => {
    render(
      <SingleTask id={123} name="Test Task" completed={false} />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should call openModal when edit button is clicked", () => {
    render(
      <SingleTask id={123} name="Test Task" completed={false} />
    );

    const editButton = screen.getByRole("button", { name: /editar/i });
    fireEvent.click(editButton);

    expect(mockOpenModal).toHaveBeenCalledWith(123);
  });

  it("should call deleteTask when delete button is clicked", () => {
    render(
      <SingleTask id={123} name="Test Task" completed={false} />
    );

    const deleteButton = screen.getByLabelText("delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(123, "admin");
  });
});