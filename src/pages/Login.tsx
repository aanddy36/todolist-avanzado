import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import AuthHeader from "../ui/AuthHeader";
import AuthError from "../ui/AuthError";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { login, isLoading } = useAuth();

  const onSubmit = (data: FormValues) => {
    login(data.email, data.password);
  };

  const fields = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        type: "email",
        validation: {
          required: "El correo electrónico es obligatorio",
        },
      },
      {
        id: "password",
        label: "Contraseña",
        type: "password",
        validation: {
          required: "La contraseña es obligatoria",
        },
      },
    ],
    []
  );
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light">
      <div
        className={`w-full max-w-md p-8 bg-white shadow-lg rounded-lg
          transition-all duration-200
        ${isLoading ? " opacity-60" : "opacity-100"}`}
      >
        <AuthHeader>Login</AuthHeader>
        <AuthError />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {fields.map(({ id, label, type, validation }) => (
            <Input
              key={id}
              id={id}
              label={label}
              type={type}
              register={register}
              validation={validation}
              disabled={isLoading}
              error={errors[id as keyof FormValues]}
            />
          ))}
          <div className="flex items-center justify-between">
            <Button disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </Button>
            <Link
              to="/register"
              className="text-sm text-primary hover:text-primary-light"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Login;
