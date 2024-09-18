import { render, screen } from "@testing-library/react";
import Input from "./Input";
import { useForm } from "react-hook-form";

describe("Input Component", () => {
  const TestInputComponent = () => {
    const { register } = useForm(); // Usamos useForm para simular el registro del input en el form

    return (
      <Input
        id="test-input"
        label="Test Label"
        type="text"
        register={register}
      />
    );
  };

  it("should render the input and label", () => {
    render(<TestInputComponent />);

    const inputElement = screen.getByRole("textbox", { name: "Test Label" });
    expect(inputElement).toBeInTheDocument();

    const labelElement = screen.getByLabelText(/test label/i);
    expect(labelElement).toBeInTheDocument();
  });
});