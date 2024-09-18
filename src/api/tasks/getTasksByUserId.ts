export const getTasksByUserId = async (id: number | undefined) => {
  const token = localStorage.getItem("token");
  if (!token || !id) {
    throw new Error("No se encontró el token o el ID del usuario.");
  }
  const userId = String(id);
  const response = await fetch(`http://localhost:5000/tasks/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return response.json();
};
