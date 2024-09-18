import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuth } from "../context/AuthContext";
import AuthHeader from "../ui/AuthHeader";
import AuthError from "../ui/AuthError";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const { registerUser, isLoading } = useAuth();

  const onSubmit = (data: FormValues) => {
    registerUser(data.email, data.password);
  };

  const fields = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        type: "email",
        validation: {
          required: "El correo electrónico es obligatorio",
          pattern: {
            value: /^[^@]+@[^@]+\.[^@]+$/,
            message: "El correo electrónico no es válido",
          },
        },
      },
      {
        id: "password",
        label: "Contraseña",
        type: "password",
        validation: {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        },
      },
      {
        id: "confirmPassword",
        label: "Confirmar Contraseña",
        type: "password",
        validation: {
          required: "Confirmar la contraseña es obligatorio",
          validate: (value: any) =>
            value === getValues("password") || "Las contraseñas no coinciden",
        },
      },
    ],
    [getValues]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light">
      <div
        className={`w-full max-w-md p-8 bg-white shadow-lg rounded-lg
          transition-all duration-200
        ${isLoading ? " opacity-60" : "opacity-100"}`}
      >
        <AuthHeader>Register</AuthHeader>
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
              {isLoading ? "Cargando..." : "Registrarse"}
            </Button>
            <Link
              to="/"
              className="text-sm text-primary hover:text-primary-light"
            >
              ¿Ya estás registrado? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Register);
