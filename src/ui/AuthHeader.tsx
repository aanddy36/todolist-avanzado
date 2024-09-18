import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthHeader: React.FC<Props> = ({ children }) => {
  return (
    <h1 className="text-2xl font-semibold mb-6 text-center text-text-dark">
      {children}
    </h1>
  );
};

export default AuthHeader;
