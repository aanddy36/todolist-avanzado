import { EditTask } from "../../types";

export const editATask = async (
  taskId: number | undefined,
  updates: EditTask
) => {
  const token = localStorage.getItem("token");
  if (!token || !taskId) {
    throw new Error("No se encontró el token o el ID de la tarea.");
  }

  const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return response.json();
};
