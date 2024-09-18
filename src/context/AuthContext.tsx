import { createContext, useContext, useState } from "react";
import { User } from "../types";
import { loginUser } from "../api/users/loginUser";
import { createAnUser } from "../api/users/createAnUser";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  fetchError: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      setFetchError("Email o contraseña incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.log(error);
      setFetchError("Error al hacer logout");
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (email: string, password: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await createAnUser({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      setFetchError("El email ya está registrado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, registerUser, isLoading, fetchError, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { login, logout, registerUser, isLoading, fetchError, user } =
    useContext(AuthContext) as AuthContextProps;
  return { login, logout, registerUser, isLoading, fetchError, user };
};

export { AuthProvider, useAuth };
