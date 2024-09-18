import { render, screen } from "@testing-library/react";
import AuthError from "../ui/AuthError";
import { useAuth } from "../context/AuthContext"; // Importa el hook

// Mock del contexto de Auth
jest.mock("../context/AuthContext");

describe("AuthError Component", () => {
  test("renders the error message when fetchError is present", () => {

    (useAuth as jest.Mock).mockReturnValue({ fetchError: "Falló la autenticación" });

    render(<AuthError />);

    const errorMessage = screen.getByText("Falló la autenticación");
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not render anything when fetchError is null", () => {
    
    (useAuth as jest.Mock).mockReturnValue({ fetchError: null });

    const { container } = render(<AuthError />);

    expect(container.firstChild).toBeNull();
  });
});