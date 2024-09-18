import { useAuth } from "../context/AuthContext";

const AuthError = () => {
  const { fetchError } = useAuth();

  if (!fetchError) return null;

  return (
    <div className=" rounded-md bg-red-500 text-white p-3">{fetchError}</div>
  );
};

export default AuthError;
