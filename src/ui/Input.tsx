import React, { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  validation?: object;
  error?: FieldError;
  disabled?: boolean;
}

const Input: FC<Props> = ({
  id,
  label,
  type,
  register,
  validation,
  error,
  disabled=false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-dark">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        disabled={disabled}
        className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none
         focus:ring-focus-ring focus:border-focus-ring sm:text-sm disabled:cursor-not-allowed"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default React.memo(Input);
