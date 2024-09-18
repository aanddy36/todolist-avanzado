export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5000/users/login", {
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
