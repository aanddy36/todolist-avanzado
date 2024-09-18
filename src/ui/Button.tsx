import React, { FC } from "react";

interface Props {
  children: string;
  disabled?: boolean;
}

const Button: FC<Props> = ({ children, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className="px-4 py-2 bg-primary text-text-light font-semibold rounded-md shadow-sm
     hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-ring
      disabled:cursor-not-allowed disabled:hover:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
