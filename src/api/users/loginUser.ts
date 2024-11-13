export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en el inicio de sesión");
  }

  return response.json();
};
