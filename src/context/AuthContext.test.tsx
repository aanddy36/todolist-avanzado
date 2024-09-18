import { render, waitFor } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { checkToken } from "../api/users/checkToken";

// Mock de la función checkToken
jest.mock("../api/users/checkToken", () => ({
  checkToken: jest.fn(),
}));

const { checkToken: mockCheckToken } = require("../api/users/checkToken");

// Mock del almacenamiento local
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test("calls verifyToken on component mount", async () => {
    mockCheckToken.mockResolvedValue({ valid: true, payload: { id: "1", email: "test@example.com", role: "user" } });
    localStorage.setItem("token", "mockToken"); // Simula un token almacenado

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockCheckToken).toHaveBeenCalledWith({ token: "mockToken" });
    });
  });

  test("removes token and sets user to null if token is invalid", async () => {
    mockCheckToken.mockResolvedValue({ valid: false });

    localStorage.setItem("token", "invalidToken");

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe(null);
    });
  });

  test("sets user if token is valid", async () => {
    const mockUser = { id: "1", email: "test@example.com", role: "user" };

    mockCheckToken.mockResolvedValue({
      valid: true,
      payload: mockUser,
    });

    localStorage.setItem("token", "validToken");

    const { getByText } = render(
      <AuthProvider>
        <div>User Logged In</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("validToken");
      expect(getByText("User Logged In")).toBeInTheDocument();
    });
  });

  test("removes token and logs out user if there's an error verifying the token", async () => {
    mockCheckToken.mockRejectedValue(new Error("Network error"));

    localStorage.setItem("token", "mockToken");

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe(null); // El token se elimina
    });
  });
});